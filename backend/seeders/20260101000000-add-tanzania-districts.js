
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const districts = [
      'Ilala',
      'Kinondoni',
      'Temeke',
      'Ubungo',
      'Kigamboni',
      'Ukerewe',
      'Magu',
      'Mwanza City (Nyamagana)',
      'Kwimba',
      'Sengerema',
      'Buchosa',
      'Ilemela',
      'Misungwi',
      'Arusha District',
      'Arusha City',
      'Meru',
      'Monduli',
      'Longido',
      'Karatu',
      'Ngorongoro',
      'Chunya',
      'Mbeya District',
      'Mbeya City',
      'Kyela',
      'Rungwe',
      'Busokelo',
      'Mbarali',
      'Mjini',
      'Magharibi A',
      'Magharibi B',
      'Kaskazini A',
      'Kaskazini B',
      'Kati',
      'Kusini'
    ];

    const now = new Date();

    // Avoid inserting duplicate districts when the seeder is rerun.
    const existingDistricts = await queryInterface.sequelize.query(
      'SELECT name FROM districts',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingNames = new Set(
      existingDistricts.map(region => region.name)
    );

    const newDistricts = districts
      .filter(name => !existingNames.has(name))
      .map(name => ({
        name,
        created_at: now,
        updated_at: now
      }));

    if (newDistricts.length > 0) {
      await queryInterface.bulkInsert('districts', newDistricts);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("districts")
  }
};