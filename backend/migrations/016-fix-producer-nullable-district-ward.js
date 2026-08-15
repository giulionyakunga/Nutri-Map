'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE producers ALTER COLUMN district_id DROP NOT NULL;
      ALTER TABLE producers ALTER COLUMN ward_id DROP NOT NULL;
      ALTER TABLE producers DROP CONSTRAINT IF EXISTS producers_district_id_fkey1;
      ALTER TABLE producers DROP CONSTRAINT IF EXISTS producers_ward_id_fkey1;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE producers ALTER COLUMN district_id SET NOT NULL;
      ALTER TABLE producers ALTER COLUMN ward_id SET NOT NULL;
    `);
  }
};
