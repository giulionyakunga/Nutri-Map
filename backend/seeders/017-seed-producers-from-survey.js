'use strict';

const producersData = [
  {
    "business_name": "Bakhresa Food Products Ltd.",
    "ownership_structure": "Large-Scale Commercial Enterprise",
    "contact_person": "Baraka Kweka",
    "position_role": "Group Chairperson",
    "phone": "700000000",
    "physical_address": "Near Lita Tower, Ilala, Dar es Salaam",
    "email": "bakhresa.food.products.ltd@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-001",
    "brela_registration_number": "BRELA-001",
    "tbs_zfda_registration_number": "TBS-001",
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Groundnuts / Bambara Groundnuts",
      "Whole Eggs / Powdered Eggs",
      "Soybeans"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Commercial Aggregators / Middlemen",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Dec",
      "Oct"
    ],
    "post_harvest_loss_percent": 5.7,
    "storage_capacity": 41.6,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "None",
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 32.9,
    "area_harvest_unit": "Acres",
    "average_yield": 5,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 4.8,
    "proximity_market_km": 2.47,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.841625,
    "longitude": 39.246503
  },
  {
    "business_name": "Azania Mills Headquarter",
    "ownership_structure": "Large-Scale Commercial Enterprise",
    "contact_person": "Zawadi Mwakalinga",
    "position_role": "Operations Coordinator",
    "phone": "700000001",
    "physical_address": "Near Lita Tower, Ilala, Dar es Salaam",
    "email": "azania.mills.headquarter@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-002",
    "brela_registration_number": "BRELA-002",
    "tbs_zfda_registration_number": "TBS-002",
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Groundnuts / Bambara Groundnuts",
      "Cassava / Banana / Plantain"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting"
    ],
    "shortage_months": [
      "May",
      "Feb",
      "Jul"
    ],
    "post_harvest_loss_percent": 7.9,
    "storage_capacity": 171.4,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "None"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 2.6,
    "area_harvest_unit": "Acres",
    "average_yield": 564,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 2.09,
    "proximity_market_km": 8.99,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.836199,
    "longitude": 39.257418
  },
  {
    "business_name": "Azania Mills Bakwata",
    "ownership_structure": "Large-Scale Commercial Enterprise",
    "contact_person": "Asha Nassoro",
    "position_role": "Secretary",
    "phone": "700000002",
    "physical_address": "Near Ubungo Plaza, Ubungo, Dar es Salaam",
    "email": "azania.mills.bakwata@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-003",
    "brela_registration_number": "BRELA-003",
    "tbs_zfda_registration_number": "TBS-003",
    "sido_registration_number": null,
    "operational_scale": "Large Industrial Processor (100+ employees)",
    "primary_raw_materials": [
      "Sorghum / Finger Millet",
      "Whole Eggs / Powdered Eggs",
      "Edible Seaweeds",
      "Groundnuts / Bambara Groundnuts",
      "Soybeans"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Jan",
      "Feb"
    ],
    "post_harvest_loss_percent": 3.5,
    "storage_capacity": 28.3,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 30.8,
    "area_harvest_unit": "Hectares",
    "average_yield": 359,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 4.56,
    "proximity_market_km": 8.34,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.797928,
    "longitude": 39.206424
  },
  {
    "business_name": "21st Century Food & Packaging Limited",
    "ownership_structure": "Large-Scale Commercial Enterprise",
    "contact_person": "Joyce Mwita",
    "position_role": "Farm Supervisor",
    "phone": "700000003",
    "physical_address": "Near Sinza Mori Bus Stand, Sinza, Dar es Salaam",
    "email": "21st.century.food.packaging.limited@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-004",
    "brela_registration_number": "BRELA-004",
    "tbs_zfda_registration_number": "TBS-004",
    "sido_registration_number": null,
    "operational_scale": "Large Industrial Processor (100+ employees)",
    "primary_raw_materials": [
      "Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Apr",
      "Dec",
      "Jul"
    ],
    "post_harvest_loss_percent": 7.4,
    "storage_capacity": 13,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 6.5,
    "area_harvest_unit": "Acres",
    "average_yield": 7,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 2.28,
    "proximity_market_km": 4.72,
    "accessibility_status": "Moderately Accessible",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.792132,
    "longitude": 39.221595
  },
  {
    "business_name": "East Coast Oils and Fats Limited",
    "ownership_structure": "Large-Scale Commercial Enterprise",
    "contact_person": "Joyce Kweka",
    "position_role": "Farm Supervisor",
    "phone": "700000004",
    "physical_address": "Near Kurasini Trade and Logistics Centre, Kurasini, Dar es Salaam",
    "email": "east.coast.oils.and.fats.limited@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-005",
    "brela_registration_number": "BRELA-005",
    "tbs_zfda_registration_number": "TBS-005",
    "sido_registration_number": null,
    "operational_scale": "Large Industrial Processor (100+ employees)",
    "primary_raw_materials": [
      "Cassava / Banana / Plantain",
      "Sorghum / Finger Millet",
      "Milk / Dairy Products",
      "Edible Seaweeds",
      "High-Iron and Zinc Beans"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Aug"
    ],
    "post_harvest_loss_percent": 4.4,
    "storage_capacity": 531,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "None"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 7.1,
    "area_harvest_unit": "Acres",
    "average_yield": 3286,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 2.02,
    "proximity_market_km": 8.68,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.85385,
    "longitude": 39.294525
  },
  {
    "business_name": "Azam Bakery",
    "ownership_structure": "Large-Scale Commercial Enterprise",
    "contact_person": "Zawadi Magesa",
    "position_role": "Group Chairperson",
    "phone": "700000005",
    "physical_address": "Near Kariakoo Market, Kariakoo, Dar es Salaam",
    "email": "azam.bakery@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-006",
    "brela_registration_number": "BRELA-006",
    "tbs_zfda_registration_number": "TBS-006",
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Cassava / Banana / Plantain",
      "Soybeans",
      "Milk / Dairy Products"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Contracted Smallholder Farmers / Outgrowers",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Sep"
    ],
    "post_harvest_loss_percent": 3.7,
    "storage_capacity": 76.1,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 3,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 0.56,
    "proximity_market_km": 3.2,
    "accessibility_status": "Moderately Accessible",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.820533,
    "longitude": 39.278423
  },
  {
    "business_name": "Kariakoo market",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Emmanuel Mushi",
    "position_role": "Group Chairperson",
    "phone": "700000006",
    "physical_address": "Near Kariakoo Market, Kariakoo, Dar es Salaam",
    "email": "kariakoo.market@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-007",
    "brela_registration_number": "BRELA-007",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Soybeans",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "May",
      "Dec"
    ],
    "post_harvest_loss_percent": 10.8,
    "storage_capacity": 11.5,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "None",
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Bambara Groundnuts / Soybeans",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 3.2,
    "area_harvest_unit": "Hectares",
    "average_yield": 723,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 3.36,
    "proximity_market_km": 4.91,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.819163,
    "longitude": 39.275686
  },
  {
    "business_name": "Mwangaza Lishe Foods",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Juma Mwita",
    "position_role": "Owner-Manager",
    "phone": "700000007",
    "physical_address": "Near Kariakoo Market, Kariakoo, Dar es Salaam",
    "email": "mwangaza.lishe.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-008",
    "brela_registration_number": "BRELA-008",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Whole Eggs / Powdered Eggs",
      "Groundnuts / Bambara Groundnuts",
      "Sorghum / Finger Millet"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Dec",
      "Sep"
    ],
    "post_harvest_loss_percent": 6.7,
    "storage_capacity": 42,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 7.7,
    "area_harvest_unit": "Acres",
    "average_yield": 9.2,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 4.51,
    "proximity_market_km": 8.81,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.821372,
    "longitude": 39.274769
  },
  {
    "business_name": "Afya Kwanza Agro Foods",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Agnes Mhando",
    "position_role": "Owner-Manager",
    "phone": "700000008",
    "physical_address": "Near Mabibo Market, Mabibo, Dar es Salaam",
    "email": "afya.kwanza.agro.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-009",
    "brela_registration_number": "BRELA-009",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Groundnuts / Bambara Groundnuts",
      "Sorghum / Finger Millet"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Jul",
      "Apr"
    ],
    "post_harvest_loss_percent": 17.7,
    "storage_capacity": 74,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish"
    ],
    "total_area_harvest_scale": 11.1,
    "area_harvest_unit": "Hectares",
    "average_yield": 35,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 0.75,
    "proximity_market_km": 0.39,
    "accessibility_status": "Highly Accessible",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.797866,
    "longitude": 39.169413
  },
  {
    "business_name": "Upendo Nutri Producers",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Hassan Nassoro",
    "position_role": "Group Chairperson",
    "phone": "700000009",
    "physical_address": "Near Mbezi Beach Africana Bus Stand, Mbezi Beach, Dar es Salaam",
    "email": "upendo.nutri.producers@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-010",
    "brela_registration_number": "BRELA-010",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-010",
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Milk / Dairy Products",
      "Edible Seaweeds"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen",
      "Own Farm / Direct Harvesting"
    ],
    "shortage_months": [
      "Oct"
    ],
    "post_harvest_loss_percent": 15.1,
    "storage_capacity": 105,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 7.3,
    "area_harvest_unit": "Hectares",
    "average_yield": 67,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 4.74,
    "proximity_market_km": 6.82,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.734126,
    "longitude": 39.182229
  },
  {
    "business_name": "Jitihada Mazao Group",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Mariam Magesa",
    "position_role": "Production Manager",
    "phone": "700000010",
    "physical_address": "Near Bunju Market, Bunju, Dar es Salaam",
    "email": "jitihada.mazao.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-011",
    "brela_registration_number": "BRELA-011",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Soybeans",
      "Maize"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Feb",
      "Oct",
      "Apr"
    ],
    "post_harvest_loss_percent": 22.4,
    "storage_capacity": 9.4,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity",
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish"
    ],
    "total_area_harvest_scale": 2.4,
    "area_harvest_unit": "Acres",
    "average_yield": 38,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 3.81,
    "proximity_market_km": 0.55,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.624487,
    "longitude": 39.147812
  },
  {
    "business_name": "Tumaini Dagaa Processors",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Asha Mwakalinga",
    "position_role": "Farm Supervisor",
    "phone": "700000011",
    "physical_address": "Near Kimara Mwisho Bus Stand, Kimara, Dar es Salaam",
    "email": "tumaini.dagaa.processors@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-012",
    "brela_registration_number": "BRELA-012",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-012",
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Sorghum / Finger Millet",
      "Milk / Dairy Products"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Nov",
      "Mar",
      "Dec"
    ],
    "post_harvest_loss_percent": 5.1,
    "storage_capacity": 2.6,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 3,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 9.6,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 4.69,
    "proximity_market_km": 6.32,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.768117,
    "longitude": 39.081073
  },
  {
    "business_name": "Kijani Lishe Enterprise",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Neema Mollel",
    "position_role": "Operations Coordinator",
    "phone": "700000012",
    "physical_address": "Near Kimbiji Market, Kimbiji, Dar es Salaam",
    "email": "kijani.lishe.enterprise@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-013",
    "brela_registration_number": "BRELA-013",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-013",
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Whole Eggs / Powdered Eggs",
      "Sorghum / Finger Millet",
      "Soybeans",
      "Milk / Dairy Products"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Oct",
      "Aug"
    ],
    "post_harvest_loss_percent": 8.9,
    "storage_capacity": 156,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Moisture/Humidity",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Bambara Groundnuts / Soybeans",
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 7.8,
    "area_harvest_unit": "Hectares",
    "average_yield": 4,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 4.44,
    "proximity_market_km": 1.97,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.994742,
    "longitude": 39.503071
  },
  {
    "business_name": "Baraka Fortified Foods",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Daudi Mwakipesile",
    "position_role": "Owner-Manager",
    "phone": "700000013",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "baraka.fortified.foods@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-014",
    "brela_registration_number": "BRELA-014",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Edible Seaweeds",
      "High-Iron and Zinc Beans"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Commercial Aggregators / Middlemen",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Dec"
    ],
    "post_harvest_loss_percent": 10.4,
    "storage_capacity": 178,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "None",
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 11.2,
    "area_harvest_unit": "Hectares",
    "average_yield": 172,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 3.68,
    "proximity_market_km": 3.8,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.928327,
    "longitude": 39.442081
  },
  {
    "business_name": "Mshikamano Women Producers",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Hassan Mwijage",
    "position_role": "Owner-Manager",
    "phone": "700000014",
    "physical_address": "Near Kigamboni Ferry Terminal, Kigamboni, Dar es Salaam",
    "email": "mshikamano.women.producers@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-015",
    "brela_registration_number": "BRELA-015",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Whole Eggs / Powdered Eggs",
      "Sorghum / Finger Millet",
      "Small Pelagic Fish (Dagaa / Omena)"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Jun",
      "Feb"
    ],
    "post_harvest_loss_percent": 18.9,
    "storage_capacity": 14.3,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 9.5,
    "area_harvest_unit": "Hectares",
    "average_yield": 9.1,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 4.58,
    "proximity_market_km": 4.88,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.831998,
    "longitude": 39.31483
  },
  {
    "business_name": "Vijana Hodari Agro Group",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Hassan Nassoro",
    "position_role": "Production Manager",
    "phone": "700000015",
    "physical_address": "Near Kimbiji Market, Kimbiji, Dar es Salaam",
    "email": "vijana.hodari.agro.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-016",
    "brela_registration_number": "BRELA-016",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Cassava / Banana / Plantain",
      "Maize"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Contracted Smallholder Farmers / Outgrowers",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Jul",
      "May",
      "Feb"
    ],
    "post_harvest_loss_percent": 15.4,
    "storage_capacity": 74,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 56,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 4.52,
    "proximity_market_km": 4.34,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -7.089516,
    "longitude": 39.523658
  },
  {
    "business_name": "Bahari Nutri Harvesters",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Emmanuel Mnyika",
    "position_role": "Owner-Manager",
    "phone": "700000016",
    "physical_address": "Near Kisutu Market, City Centre, Dar es Salaam",
    "email": "bahari.nutri.harvesters@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-017",
    "brela_registration_number": "BRELA-017",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Milk / Dairy Products",
      "Cassava / Banana / Plantain",
      "Soybeans"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Feb",
      "Jan",
      "May"
    ],
    "post_harvest_loss_percent": 17,
    "storage_capacity": 88,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Bambara Groundnuts / Soybeans",
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 6.6,
    "area_harvest_unit": "Acres",
    "average_yield": 13,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 0.63,
    "proximity_market_km": 8.78,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.805009,
    "longitude": 39.273726
  },
  {
    "business_name": "Maendeleo Food Solutions",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Joseph Mushi",
    "position_role": "Operations Coordinator",
    "phone": "700000017",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "maendeleo.food.solutions@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-018",
    "brela_registration_number": "BRELA-018",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Sorghum / Finger Millet",
      "Soybeans",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Open-Air Public / Wholesale Markets",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Aug"
    ],
    "post_harvest_loss_percent": 14,
    "storage_capacity": 15.1,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Edible Seaweed",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 8,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 1568,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 4.06,
    "proximity_market_km": 8.08,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.905425,
    "longitude": 39.459924
  },
  {
    "business_name": "Umoja First Foods Group",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Halima Nassoro",
    "position_role": "Owner-Manager",
    "phone": "700000018",
    "physical_address": "Near Msongola Market, Msongola, Dar es Salaam",
    "email": "umoja.first.foods.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-019",
    "brela_registration_number": "BRELA-019",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Milk / Dairy Products",
      "Groundnuts / Bambara Groundnuts"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Dec"
    ],
    "post_harvest_loss_percent": 15.8,
    "storage_capacity": 7.4,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity",
      "Mold/Aflatoxins"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 3.1,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 4.74,
    "proximity_market_km": 8.88,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -7.054748,
    "longitude": 39.085904
  },
  {
    "business_name": "Malkia Lishe Cooperative",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Mariam Sanga",
    "position_role": "Secretary",
    "phone": "700000019",
    "physical_address": "Near Mabibo Market, Mabibo, Dar es Salaam",
    "email": "malkia.lishe.cooperative@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-020",
    "brela_registration_number": "BRELA-020",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-020",
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Cassava / Banana / Plantain"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Oct",
      "May"
    ],
    "post_harvest_loss_percent": 12.9,
    "storage_capacity": 23,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "None"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 7,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 3173,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 2.29,
    "proximity_market_km": 4.59,
    "accessibility_status": "Moderately Accessible",
    "infrastructure_status": "Low",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.810376,
    "longitude": 39.170551
  },
  {
    "business_name": "Nguvu Kazi Agro Foods",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Baraka Sanga",
    "position_role": "Owner-Manager",
    "phone": "700000020",
    "physical_address": "Near Pugu Kajiungeni Market, Pugu, Dar es Salaam",
    "email": "nguvu.kazi.agro.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-021",
    "brela_registration_number": "BRELA-021",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-021",
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Edible Seaweeds",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Soybeans",
      "Small Pelagic Fish (Dagaa / Omena)"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Jan"
    ],
    "post_harvest_loss_percent": 23.1,
    "storage_capacity": 46,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 10.7,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 4.1,
    "proximity_market_km": 3.83,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.990017,
    "longitude": 39.103976
  },
  {
    "business_name": "Dar NutriBlend Enterprise",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Hassan Mushi",
    "position_role": "Secretary",
    "phone": "700000021",
    "physical_address": "Near Gongo la Mboto Bus Stand, Gongo la Mboto, Dar es Salaam",
    "email": "dar.nutriblend.enterprise@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-022",
    "brela_registration_number": "BRELA-022",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Sorghum / Finger Millet",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Edible Seaweeds",
      "Milk / Dairy Products"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Aug"
    ],
    "post_harvest_loss_percent": 5.5,
    "storage_capacity": 41,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 3,
    "area_harvest_unit": "Acres",
    "average_yield": 72,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 4.78,
    "proximity_market_km": 8.98,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.959536,
    "longitude": 39.14947
  },
  {
    "business_name": "Kisima Cha Afya Foods",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Emmanuel Nassoro",
    "position_role": "Secretary",
    "phone": "700000022",
    "physical_address": "Near Quality Centre Mall, Nyerere Road, Dar es Salaam",
    "email": "kisima.cha.afya.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-023",
    "brela_registration_number": "BRELA-023",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Soybeans",
      "Groundnuts / Bambara Groundnuts",
      "Cassava / Banana / Plantain"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Commercial Aggregators / Middlemen",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Nov",
      "Jul",
      "Sep"
    ],
    "post_harvest_loss_percent": 13.2,
    "storage_capacity": 3.1,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Lack of Cold Storage",
      "Mold/Aflatoxins"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "High-Iron and Zinc Beans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 7.1,
    "area_harvest_unit": "Hectares",
    "average_yield": 7.7,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 3.72,
    "proximity_market_km": 2.73,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.872797,
    "longitude": 39.274387
  },
  {
    "business_name": "Jua Kali Grain Processors",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Juma Magesa",
    "position_role": "Owner-Manager",
    "phone": "700000023",
    "physical_address": "Near Kibada Market / Bus Stand, Kibada, Dar es Salaam",
    "email": "jua.kali.grain.processors@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-024",
    "brela_registration_number": "BRELA-024",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Whole Eggs / Powdered Eggs",
      "Edible Seaweeds"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Feb",
      "Jan"
    ],
    "post_harvest_loss_percent": 15.2,
    "storage_capacity": 97,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "None",
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans",
      "Bambara Groundnuts / Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 1624,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 3.47,
    "proximity_market_km": 0.45,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.939694,
    "longitude": 39.375745
  },
  {
    "business_name": "Neema Biofortified Foods",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Joyce Mtemi",
    "position_role": "Farm Supervisor",
    "phone": "700000024",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "neema.biofortified.foods@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-025",
    "brela_registration_number": "BRELA-025",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Groundnuts / Bambara Groundnuts",
      "Milk / Dairy Products",
      "Small Pelagic Fish (Dagaa / Omena)"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Jun",
      "Apr",
      "Oct"
    ],
    "post_harvest_loss_percent": 6.1,
    "storage_capacity": 148,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "None"
    ],
    "nutrient_dense_crops": [
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "High-Iron and Zinc Beans",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 6,
    "area_harvest_unit": "Acres",
    "average_yield": 7.8,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 2.22,
    "proximity_market_km": 8.89,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.894682,
    "longitude": 39.454172
  },
  {
    "business_name": "Kipepeo Nutrition Group",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Mariam Mollel",
    "position_role": "Secretary",
    "phone": "700000025",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "kipepeo.nutrition.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-026",
    "brela_registration_number": "BRELA-026",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Groundnuts / Bambara Groundnuts",
      "Sorghum / Finger Millet",
      "Soybeans"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Contracted Smallholder Farmers / Outgrowers",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jul",
      "Jan",
      "Oct"
    ],
    "post_harvest_loss_percent": 21.7,
    "storage_capacity": 16.2,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 2753,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 2.79,
    "proximity_market_km": 6.95,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.924928,
    "longitude": 39.469987
  },
  {
    "business_name": "Tegemeo Small Producers",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Daudi Mwijage",
    "position_role": "Production Manager",
    "phone": "700000026",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "tegemeo.small.producers@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-027",
    "brela_registration_number": "BRELA-027",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Groundnuts / Bambara Groundnuts",
      "Whole Eggs / Powdered Eggs",
      "Small Pelagic Fish (Dagaa / Omena)"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Aug",
      "Feb",
      "May"
    ],
    "post_harvest_loss_percent": 23.9,
    "storage_capacity": 16.7,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 6,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 9.7,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 2.75,
    "proximity_market_km": 2.37,
    "accessibility_status": "Moderately Accessible",
    "infrastructure_status": "Low",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.976049,
    "longitude": 39.458196
  },
  {
    "business_name": "Furaha Family Foods",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Neema Mtemi",
    "position_role": "Group Chairperson",
    "phone": "700000027",
    "physical_address": "Near Magufuli Bus Terminal, Mbezi Luis, Dar es Salaam",
    "email": "furaha.family.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-028",
    "brela_registration_number": "BRELA-028",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-028",
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Sorghum / Finger Millet",
      "Groundnuts / Bambara Groundnuts",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Commercial Aggregators / Middlemen",
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Jun"
    ],
    "post_harvest_loss_percent": 23.2,
    "storage_capacity": 13,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Lack of Cold Storage",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 10,
    "area_harvest_unit": "Hectares",
    "average_yield": 149,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 0.97,
    "proximity_market_km": 7.9,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.808348,
    "longitude": 39.076348
  },
  {
    "business_name": "Mkombozi Agro Processors",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Emmanuel Kweka",
    "position_role": "Owner-Manager",
    "phone": "700000028",
    "physical_address": "Near Pugu Station, Pugu, Dar es Salaam",
    "email": "mkombozi.agro.processors@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-029",
    "brela_registration_number": "BRELA-029",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "May",
      "Aug",
      "Jul"
    ],
    "post_harvest_loss_percent": 6.2,
    "storage_capacity": 106,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "None",
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 2,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 42,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 1.17,
    "proximity_market_km": 7.31,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.859003,
    "longitude": 39.096865
  },
  {
    "business_name": "Amani Nutrient Foods",
    "ownership_structure": "Private Micro-Processing Enterprise",
    "contact_person": "Halima Mwakalinga",
    "position_role": "Operations Coordinator",
    "phone": "700000029",
    "physical_address": "Near Bunju Market, Bunju, Dar es Salaam",
    "email": "amani.nutrient.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-030",
    "brela_registration_number": "BRELA-030",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Soybeans",
      "Small Pelagic Fish (Dagaa / Omena)"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Apr"
    ],
    "post_harvest_loss_percent": 25.6,
    "storage_capacity": 45,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 4,
    "area_harvest_unit": "Hectares",
    "average_yield": 8.2,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 4.8,
    "proximity_market_km": 6.89,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.631636,
    "longitude": 39.104046
  },
  {
    "business_name": "Pamoja Harvest Group",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Rehema Mwakalinga",
    "position_role": "Production Manager",
    "phone": "700000030",
    "physical_address": "Near Kinyerezi Bus Stand, Kinyerezi, Dar es Salaam",
    "email": "pamoja.harvest.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-031",
    "brela_registration_number": "BRELA-031",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-031",
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Edible Seaweeds",
      "Maize"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Open-Air Public / Wholesale Markets",
      "Own Farm / Direct Harvesting"
    ],
    "shortage_months": [
      "Mar",
      "May",
      "Apr"
    ],
    "post_harvest_loss_percent": 17.9,
    "storage_capacity": 3.6,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 10.8,
    "area_harvest_unit": "Acres",
    "average_yield": 2205,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 3.03,
    "proximity_market_km": 2.07,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.837183,
    "longitude": 39.122096
  },
  {
    "business_name": "Kiboko Fish and Grain Foods",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Joseph Mushi",
    "position_role": "Secretary",
    "phone": "700000031",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "kiboko.fish.and.grain.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-032",
    "brela_registration_number": "BRELA-032",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-032",
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Whole Eggs / Powdered Eggs",
      "Soybeans",
      "Cassava / Banana / Plantain",
      "Edible Seaweeds"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Dec",
      "Nov",
      "Aug"
    ],
    "post_harvest_loss_percent": 9.8,
    "storage_capacity": 7.8,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 4.5,
    "area_harvest_unit": "Hectares",
    "average_yield": 1635,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 2.46,
    "proximity_market_km": 5.04,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.939317,
    "longitude": 39.47332
  },
  {
    "business_name": "Mwanzo Bora Producers",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Baraka Msuya",
    "position_role": "Group Chairperson",
    "phone": "700000032",
    "physical_address": "Near Wazo Hill Cement Junction, Wazo, Dar es Salaam",
    "email": "mwanzo.bora.producers@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-033",
    "brela_registration_number": "BRELA-033",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Edible Seaweeds",
      "Sorghum / Finger Millet",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Sep"
    ],
    "post_harvest_loss_percent": 8.1,
    "storage_capacity": 101,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Moisture/Humidity",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 7.2,
    "area_harvest_unit": "Hectares",
    "average_yield": 37,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 3.57,
    "proximity_market_km": 7.92,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.688096,
    "longitude": 39.095878
  },
  {
    "business_name": "Tunu Lishe Products",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Ramadhani Mnyika",
    "position_role": "Farm Supervisor",
    "phone": "700000033",
    "physical_address": "Near Chanika Bus Stand, Chanika, Dar es Salaam",
    "email": "tunu.lishe.products@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-034",
    "brela_registration_number": "BRELA-034",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Cassava / Banana / Plantain",
      "Groundnuts / Bambara Groundnuts",
      "Sorghum / Finger Millet",
      "Edible Seaweeds"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Aug",
      "Apr",
      "Sep"
    ],
    "post_harvest_loss_percent": 16.7,
    "storage_capacity": 127,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage",
      "Mold/Aflatoxins"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 7.4,
    "area_harvest_unit": "Hectares",
    "average_yield": 2.5,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 4.72,
    "proximity_market_km": 6.98,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.952632,
    "longitude": 39.194492
  },
  {
    "business_name": "Nyota Njema Agro Foods",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Juma Nassoro",
    "position_role": "Secretary",
    "phone": "700000034",
    "physical_address": "Near Gongo la Mboto Bus Stand, Gongo la Mboto, Dar es Salaam",
    "email": "nyota.njema.agro.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-035",
    "brela_registration_number": "BRELA-035",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Whole Eggs / Powdered Eggs",
      "Cassava / Banana / Plantain",
      "Soybeans",
      "Small Pelagic Fish (Dagaa / Omena)"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Commercial Aggregators / Middlemen",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jun",
      "Aug"
    ],
    "post_harvest_loss_percent": 7.1,
    "storage_capacity": 10.7,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 5.1,
    "area_harvest_unit": "Hectares",
    "average_yield": 1440,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 3.81,
    "proximity_market_km": 8.98,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.908052,
    "longitude": 39.174281
  },
  {
    "business_name": "Safina Sea and Farm Foods",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Hassan Massawe",
    "position_role": "Owner-Manager",
    "phone": "700000035",
    "physical_address": "Near Mji Mwema Market, Kigamboni, Dar es Salaam",
    "email": "safina.sea.and.farm.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-036",
    "brela_registration_number": "BRELA-036",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jan",
      "Jun"
    ],
    "post_harvest_loss_percent": 10.7,
    "storage_capacity": 4.9,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 10,
    "area_harvest_unit": "Hectares",
    "average_yield": 3.9,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 3.91,
    "proximity_market_km": 7.67,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.887538,
    "longitude": 39.382416
  },
  {
    "business_name": "Imara Women Nutrition Group",
    "ownership_structure": "Informal Grassroots Producer",
    "contact_person": "Ramadhani Massawe",
    "position_role": "Farm Supervisor",
    "phone": "700000036",
    "physical_address": "Near Somangila Market, Somangila, Dar es Salaam",
    "email": "imara.women.nutrition.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": null,
    "brela_registration_number": null,
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Maize",
      "Soybeans",
      "Groundnuts / Bambara Groundnuts",
      "High-Iron and Zinc Beans"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Nov",
      "May"
    ],
    "post_harvest_loss_percent": 26.1,
    "storage_capacity": 104,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 10.6,
    "area_harvest_unit": "Hectares",
    "average_yield": 59,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 1.16,
    "proximity_market_km": 7.43,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -7.093914,
    "longitude": 39.422842
  },
  {
    "business_name": "Ufanisi Food Producers",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Joseph Mwita",
    "position_role": "Farm Supervisor",
    "phone": "700000037",
    "physical_address": "Near Pugu Kajiungeni Market, Pugu, Dar es Salaam",
    "email": "ufanisi.food.producers@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-038",
    "brela_registration_number": "BRELA-038",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Maize",
      "Edible Seaweeds"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Nov",
      "Oct"
    ],
    "post_harvest_loss_percent": 24.2,
    "storage_capacity": 89,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "None",
      "Mold/Aflatoxins"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 9.3,
    "area_harvest_unit": "Acres",
    "average_yield": 3286,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 2.95,
    "proximity_market_km": 4.92,
    "accessibility_status": "Moderately Accessible",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.965982,
    "longitude": 39.112143
  },
  {
    "business_name": "Rafiki Nutri Crops",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Neema Mrema",
    "position_role": "Secretary",
    "phone": "700000038",
    "physical_address": "Near TAZARA Railway Station, Chang'ombe, Dar es Salaam",
    "email": "rafiki.nutri.crops@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-039",
    "brela_registration_number": "BRELA-039",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Milk / Dairy Products",
      "Groundnuts / Bambara Groundnuts",
      "Soybeans",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Oct",
      "Jan"
    ],
    "post_harvest_loss_percent": 13.3,
    "storage_capacity": 107,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "None"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish"
    ],
    "total_area_harvest_scale": 4,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 36,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 4.43,
    "proximity_market_km": 8.72,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.852354,
    "longitude": 39.218799
  },
  {
    "business_name": "Kilimo Bora Dar Group",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Ramadhani Mrema",
    "position_role": "Owner-Manager",
    "phone": "700000039",
    "physical_address": "Near Mbezi Beach Africana Bus Stand, Mbezi Beach, Dar es Salaam",
    "email": "kilimo.bora.dar.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-040",
    "brela_registration_number": "BRELA-040",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Open-Air Public / Wholesale Markets",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Oct"
    ],
    "post_harvest_loss_percent": 11.3,
    "storage_capacity": 33,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage",
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "High-Iron and Zinc Beans",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 6.4,
    "area_harvest_unit": "Acres",
    "average_yield": 7,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 2.81,
    "proximity_market_km": 6.52,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.768112,
    "longitude": 39.156904
  },
  {
    "business_name": "Nuru Complementary Foods",
    "ownership_structure": "Private Micro-Processing Enterprise",
    "contact_person": "Mariam Mtemi",
    "position_role": "Farm Supervisor",
    "phone": "700000040",
    "physical_address": "Near Mbweni Bus Stand, Mbweni, Dar es Salaam",
    "email": "nuru.complementary.foods@example.invalid",
    "operational_status": "Seasonal (Operating only during harvest/raw material availability)",
    "tin": "TIN-041",
    "brela_registration_number": "BRELA-041",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Medium-scale (50–99 employees)",
    "primary_raw_materials": [
      "Milk / Dairy Products",
      "Edible Seaweeds",
      "Small Pelagic Fish (Dagaa / Omena)",
      "Soybeans"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jan",
      "Apr"
    ],
    "post_harvest_loss_percent": 15.5,
    "storage_capacity": 15.6,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "High-Iron and Zinc Beans"
    ],
    "total_area_harvest_scale": 6,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 4.4,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 3.74,
    "proximity_market_km": 6.98,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "Low",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.593219,
    "longitude": 39.124948
  },
  {
    "business_name": "Hekima Agro Nutrition",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Halima Mwakipesile",
    "position_role": "Owner-Manager",
    "phone": "700000041",
    "physical_address": "Near Kimbiji Market, Kimbiji, Dar es Salaam",
    "email": "hekima.agro.nutrition@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-042",
    "brela_registration_number": "BRELA-042",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Cassava / Banana / Plantain"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jun"
    ],
    "post_harvest_loss_percent": 7.8,
    "storage_capacity": 15.2,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "None"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 7,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 68,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 4.28,
    "proximity_market_km": 8.78,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -7.026484,
    "longitude": 39.481483
  },
  {
    "business_name": "Wakulima Jasiri Group",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Juma Mhando",
    "position_role": "Owner-Manager",
    "phone": "700000042",
    "physical_address": "Near Wazo Hill Cement Junction, Wazo, Dar es Salaam",
    "email": "wakulima.jasiri.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-043",
    "brela_registration_number": "BRELA-043",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Edible Seaweeds",
      "Cassava / Banana / Plantain",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Milk / Dairy Products"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Oct",
      "Jul"
    ],
    "post_harvest_loss_percent": 16.2,
    "storage_capacity": 10.2,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "None"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 1,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 1.5,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 2.99,
    "proximity_market_km": 8.98,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.694467,
    "longitude": 39.131857
  },
  {
    "business_name": "Zawadi Nutri Foods",
    "ownership_structure": "Informal Grassroots Producer",
    "contact_person": "Hassan Sanga",
    "position_role": "Secretary",
    "phone": "700000043",
    "physical_address": "Near Tabata Segerea Bus Stand, Tabata, Dar es Salaam",
    "email": "zawadi.nutri.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": null,
    "brela_registration_number": null,
    "tbs_zfda_registration_number": null,
    "sido_registration_number": "SIDO-044",
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Edible Seaweeds",
      "Milk / Dairy Products",
      "Groundnuts / Bambara Groundnuts",
      "Maize"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Contracted Smallholder Farmers / Outgrowers"
    ],
    "shortage_months": [
      "Apr"
    ],
    "post_harvest_loss_percent": 5.9,
    "storage_capacity": 64,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Mold/Aflatoxins",
      "None"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 6,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 2.9,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 3.05,
    "proximity_market_km": 5.62,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.853693,
    "longitude": 39.187486
  },
  {
    "business_name": "Mwambao Dagaa Group",
    "ownership_structure": "Youth Cooperative (Majority owners aged 18–35)",
    "contact_person": "Neema Mushi",
    "position_role": "Secretary",
    "phone": "700000044",
    "physical_address": "Near Lita Tower, Ilala, Dar es Salaam",
    "email": "mwambao.dagaa.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-045",
    "brela_registration_number": "BRELA-045",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Groundnuts / Bambara Groundnuts",
      "High-Iron and Zinc Beans",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jul",
      "Feb"
    ],
    "post_harvest_loss_percent": 21.7,
    "storage_capacity": 11.8,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "High-Iron and Zinc Beans",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 1.9,
    "area_harvest_unit": "Acres",
    "average_yield": 1572,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 3.57,
    "proximity_market_km": 8.98,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.835088,
    "longitude": 39.237852
  },
  {
    "business_name": "Kazi Yetu Food Enterprise",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Daudi Mushi",
    "position_role": "Owner-Manager",
    "phone": "700000045",
    "physical_address": "Near Kibada Market / Bus Stand, Kibada, Dar es Salaam",
    "email": "kazi.yetu.food.enterprise@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-046",
    "brela_registration_number": "BRELA-046",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Maize"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Commercial Aggregators / Middlemen",
      "Own Farm / Direct Harvesting"
    ],
    "shortage_months": [
      "Sep"
    ],
    "post_harvest_loss_percent": 20.3,
    "storage_capacity": 6.2,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Insect Pests",
      "Moisture/Humidity"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans",
      "Bambara Groundnuts / Soybeans"
    ],
    "total_area_harvest_scale": 6.5,
    "area_harvest_unit": "Acres",
    "average_yield": 1.2,
    "yield_unit": "Tons",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 2.22,
    "proximity_market_km": 5.74,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.913257,
    "longitude": 39.339168
  },
  {
    "business_name": "Chanzo Cha Afya Group",
    "ownership_structure": "Registered Farmer Association",
    "contact_person": "Mariam Mnyika",
    "position_role": "Production Manager",
    "phone": "700000046",
    "physical_address": "Near Kisarawe II Market, Kigamboni, Dar es Salaam",
    "email": "chanzo.cha.afya.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-047",
    "brela_registration_number": "BRELA-047",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "High-Iron and Zinc Beans",
      "Milk / Dairy Products"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting"
    ],
    "shortage_months": [
      "May",
      "Mar",
      "Jan"
    ],
    "post_harvest_loss_percent": 10,
    "storage_capacity": 7,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Mold/Aflatoxins"
    ],
    "nutrient_dense_crops": [
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 5,
    "area_harvest_unit": "Number of Boats (for Dagaa)",
    "average_yield": 622,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 0.46,
    "proximity_market_km": 4.36,
    "accessibility_status": "Moderately Accessible",
    "infrastructure_status": "Moderate",
    "sanitary_status": "High",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.900708,
    "longitude": 39.407576
  },
  {
    "business_name": "Mavuno Bora Producers",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Zawadi Kweka",
    "position_role": "Operations Coordinator",
    "phone": "700000047",
    "physical_address": "Near Somangila Market, Somangila, Dar es Salaam",
    "email": "mavuno.bora.producers@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-048",
    "brela_registration_number": "BRELA-048",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Sorghum / Finger Millet",
      "Cassava / Banana / Plantain",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "High-Iron and Zinc Beans"
    ],
    "primary_sourcing_channels": [
      "Own Farm / Direct Harvesting"
    ],
    "shortage_months": [
      "Jun",
      "Sep",
      "Jan"
    ],
    "post_harvest_loss_percent": 19.2,
    "storage_capacity": 17,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "Lack of Cold Storage"
    ],
    "nutrient_dense_crops": [
      "High-Iron and Zinc Beans",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 2.6,
    "area_harvest_unit": "Hectares",
    "average_yield": 1611,
    "yield_unit": "Kg",
    "harvest_cycles_per_year": "2 Seasons",
    "proximity_major_road_km": 0.48,
    "proximity_market_km": 7.59,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Moderate",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -7.084648,
    "longitude": 39.469386
  },
  {
    "business_name": "Juhudi Grain and Legume Foods",
    "ownership_structure": "Women-Led Cooperative",
    "contact_person": "Hassan Massawe",
    "position_role": "Owner-Manager",
    "phone": "700000048",
    "physical_address": "Near Vijibweni Market, Kigamboni, Dar es Salaam",
    "email": "juhudi.grain.and.legume.foods@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-049",
    "brela_registration_number": "BRELA-049",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Small-scale (5–49 employees)",
    "primary_raw_materials": [
      "Small Pelagic Fish (Dagaa / Omena)",
      "Orange-Fleshed Sweet Potatoes (OFSP)",
      "Whole Eggs / Powdered Eggs"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Own Farm / Direct Harvesting",
      "Commercial Aggregators / Middlemen"
    ],
    "shortage_months": [
      "Jun",
      "Feb",
      "Jul"
    ],
    "post_harvest_loss_percent": 16.6,
    "storage_capacity": 6.6,
    "storage_capacity_unit": "Tons",
    "main_storage_challenges": [
      "Moisture/Humidity",
      "Mold/Aflatoxins"
    ],
    "nutrient_dense_crops": [
      "Edible Seaweed",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "total_area_harvest_scale": 2.3,
    "area_harvest_unit": "Hectares",
    "average_yield": 63,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "1 Season",
    "proximity_major_road_km": 0.54,
    "proximity_market_km": 1.51,
    "accessibility_status": "Highly Accessible",
    "infrastructure_status": "Low",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -7.02104,
    "longitude": 39.416361
  },
  {
    "business_name": "Azania Community Nutrition Group",
    "ownership_structure": "Medium-Scale Commercial Enterprise",
    "contact_person": "Agnes Magesa",
    "position_role": "Farm Supervisor",
    "phone": "700000049",
    "physical_address": "Near Mbagala Rangi Tatu Bus Stand, Mbagala, Dar es Salaam",
    "email": "azania.community.nutrition.group@example.invalid",
    "operational_status": "Active (Operating year-round)",
    "tin": "TIN-050",
    "brela_registration_number": "BRELA-050",
    "tbs_zfda_registration_number": null,
    "sido_registration_number": null,
    "operational_scale": "Micro-enterprise (< 5 employees)",
    "primary_raw_materials": [
      "Cassava / Banana / Plantain",
      "High-Iron and Zinc Beans",
      "Whole Eggs / Powdered Eggs",
      "Orange-Fleshed Sweet Potatoes (OFSP)"
    ],
    "primary_sourcing_channels": [
      "Contracted Smallholder Farmers / Outgrowers",
      "Commercial Aggregators / Middlemen",
      "Open-Air Public / Wholesale Markets"
    ],
    "shortage_months": [
      "Jul",
      "May",
      "Nov"
    ],
    "post_harvest_loss_percent": 9.8,
    "storage_capacity": 158,
    "storage_capacity_unit": "Bags",
    "main_storage_challenges": [
      "None"
    ],
    "nutrient_dense_crops": [
      "Bambara Groundnuts / Soybeans",
      "Small Pelagic Fish (Dagaa) / Freshwater Fish",
      "Edible Seaweed"
    ],
    "total_area_harvest_scale": 10.8,
    "area_harvest_unit": "Hectares",
    "average_yield": 32,
    "yield_unit": "100kg Bags",
    "harvest_cycles_per_year": "Year-round",
    "proximity_major_road_km": 4.42,
    "proximity_market_km": 8.82,
    "accessibility_status": "Low Accessibility",
    "infrastructure_status": "High",
    "sanitary_status": "Low",
    "data_status": "HYPOTHETICAL / TESTING DATA",
    "latitude": -6.911595,
    "longitude": 39.286104
  }
];

module.exports = {
  async up(queryInterface) {
    // Look up (or create) the region these hypothetical/test producers belong to
    const [existingRegion] = await queryInterface.sequelize.query(
      `SELECT id FROM regions WHERE name = 'Dar es Salaam' AND country = 'Tanzania' LIMIT 1;`
    );

    let regionId;
    if (existingRegion.length) {
      regionId = existingRegion[0].id;
    } else {
      const [inserted] = await queryInterface.sequelize.query(
        `INSERT INTO regions (name, country, created_at, updated_at)
         VALUES ('Dar es Salaam', 'Tanzania', NOW(), NOW())
         RETURNING id;`
      );
      regionId = inserted[0].id;
    }

    const now = new Date();
    const rows = producersData.map((p) => ({
      ...p,
      region_id: regionId,
      source: 'csv_survey_import',
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert('producers', rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('producers', { source: 'csv_survey_import' }, {});
  }
};