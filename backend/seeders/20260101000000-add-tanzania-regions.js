
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const regions = [
      'Dar es Salaam',
      'Mwanza',
      'Arusha',
      'Mbeya',
      'Mjini Magharibi (Zanzibar)',
      'Kaskazini Unguja (Zanzibar)',
      'Kusini Unguja (Zanzibar)'
    ];

    const now = new Date();

    // Avoid inserting duplicate regions when the seeder is rerun.
    const existingRegions = await queryInterface.sequelize.query(
      'SELECT name FROM regions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingNames = new Set(
      existingRegions.map(region => region.name)
    );

    const newRegions = regions
      .filter(name => !existingNames.has(name))
      .map(name => ({
        name,
        country: 'Tanzania',
        created_at: now,
        updated_at: now
      }));

    if (newRegions.length > 0) {
      await queryInterface.bulkInsert('regions', newRegions);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("regions")
  }
};