require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../models');

function parseCsv(text) {
  const normalized = text.split('\r\n').join('\n').split('\r').join('\n');
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function splitList(value) {
  if (!value || !value.trim()) return null;
  return value.split(';').map((v) => v.trim()).filter(Boolean);
}

function toFloatOrNull(value) {
  if (value === undefined || value === null || value.trim() === '') return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

function deriveRegistrationType(ownership) {
  return /informal/i.test(ownership || '') ? 'informal' : 'formal';
}

function deriveOrganizationType(ownership) {
  const value = (ownership || '').toLowerCase();
  if (value.includes('women')) return 'women_group';
  if (value.includes('youth')) return 'youth_group';
  if (value.includes('cooperative') || value.includes('association')) return 'cooperative';
  return 'company';
}

async function importBoundary() {
  const geojsonPath = path.join(__dirname, '..', 'seeders', 'data', 'dsm_administrative_boundary.geojson');
  const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

  const [existing] = await db.sequelize.query(`SELECT id FROM regions WHERE name = 'Dar es Salaam' LIMIT 1`);
  if (existing.length) {
    await db.sequelize.query(
      `UPDATE regions SET boundary = ST_GeomFromGeoJSON(:geom) WHERE id = :id`,
      { replacements: { geom: JSON.stringify(geojson), id: existing[0].id } }
    );
    return existing[0].id;
  }

  const [inserted] = await db.sequelize.query(
    `INSERT INTO regions (name, country, boundary, created_at, updated_at)
     VALUES ('Dar es Salaam', 'Tanzania', ST_GeomFromGeoJSON(:geom), now(), now())
     RETURNING id`,
    { replacements: { geom: JSON.stringify(geojson) } }
  );
  return inserted[0].id;
}

async function importProducers(regionId, userId) {
  const csvPath = path.join(__dirname, '..', 'seeders', 'data', 'dsm_food_producers_details.csv');
  const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
  const header = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1).filter((r) => r.length === header.length && r.some((c) => c.trim()));

  const col = (row, name) => row[header.indexOf(name)];

  let created = 0;
  let skipped = 0;

  for (const row of dataRows) {
    const businessName = col(row, 'Name of Enterprise / Group');
    const latitude = toFloatOrNull(col(row, 'Latitude'));
    const longitude = toFloatOrNull(col(row, 'Longitude'));

    if (!businessName || latitude === null || longitude === null) {
      skipped++;
      continue;
    }

    const existing = await db.producer.findOne({ where: { business_name: businessName, latitude, longitude } });
    if (existing) {
      skipped++;
      continue;
    }

    const ownership = col(row, 'Ownership and Legal Structure');

    await db.producer.create({
      business_name: businessName,
      ownership_structure: ownership,
      registration_type: deriveRegistrationType(ownership),
      organization_type: deriveOrganizationType(ownership),
      contact_person: col(row, 'Primary Contact Person'),
      position_role: col(row, 'Position / Role'),
      phone: col(row, 'Phone Number'),
      physical_address: col(row, 'Physical Street Address / Landmark'),
      email: col(row, 'E-mail Address'),
      operational_status: col(row, 'Operational Status'),
      tin: col(row, 'TIN'),
      brela_registration_number: col(row, 'BRELA Registration Number'),
      tbs_zfda_registration_number: col(row, '1.7 TBS / ZFDA Registration Number'),
      sido_registration_number: col(row, 'SIDO Registration Number'),
      operational_scale: col(row, 'Operational Scale Classification'),
      primary_raw_materials: splitList(col(row, 'Primary Raw Materials Sourced and Used')),
      primary_sourcing_channels: splitList(col(row, 'Primary Sourcing Channels')),
      shortage_months: splitList(col(row, 'Months of Severe Shortage / Price Spikes')),
      post_harvest_loss_percent: toFloatOrNull(col(row, 'Estimated Post-Harvest Loss (%)')),
      storage_capacity: toFloatOrNull(col(row, 'Raw Material Storage Capacity')),
      storage_capacity_unit: col(row, 'Storage Capacity Unit'),
      main_storage_challenges: splitList(col(row, 'Main Storage Challenges')),
      nutrient_dense_crops: splitList(col(row, 'Nutrient-Dense Crops / Ingredients Cultivated or Harvested')),
      total_area_harvest_scale: toFloatOrNull(col(row, 'Total Area / Harvest Scale')),
      area_harvest_unit: col(row, 'Area / Harvest Unit'),
      average_yield: toFloatOrNull(col(row, 'Average Yield per Harvest / Season')),
      yield_unit: col(row, 'Yield Unit'),
      harvest_cycles_per_year: col(row, 'Harvest Cycles per Year'),
      proximity_major_road_km: toFloatOrNull(col(row, 'Proximity to Major Road (km)')),
      proximity_market_km: toFloatOrNull(col(row, 'Proximity to Market (km)')),
      accessibility_status: col(row, 'Accessibility Status'),
      infrastructure_status: col(row, 'Infrastructure Status'),
      sanitary_status: col(row, 'Sanitary Status'),
      data_status: 'hypothetical_testing',
      region_id: regionId,
      latitude,
      longitude,
      verification_status: 'pending_field_validation',
      source: 'manual_entry',
      status: 'active',
      created_by: userId || null
    });
    created++;
  }

  return { created, skipped, total: dataRows.length };
}

async function main() {
  await db.sequelize.authenticate();
  console.log('Connected. Importing Dar es Salaam boundary...');
  const regionId = await importBoundary();
  console.log(`Region ready: id=${regionId}`);

  console.log('Importing producers from CSV...');
  const result = await importProducers(regionId, null);
  console.log(`Import complete: created=${result.created} skipped=${result.skipped} total=${result.total}`);

  await db.sequelize.close();
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
