'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('regions', 'boundary', {
      type: Sequelize.GEOMETRY('MULTIPOLYGON', 4326),
      allowNull: true
    });

    await queryInterface.addColumn('districts', 'boundary', {
      type: Sequelize.GEOMETRY('MULTIPOLYGON', 4326),
      allowNull: true
    });

    await queryInterface.sequelize.query(
      `CREATE INDEX regions_boundary_gist_idx ON regions USING GIST (boundary);`
    );
    await queryInterface.sequelize.query(
      `CREATE INDEX districts_boundary_gist_idx ON districts USING GIST (boundary);`
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('districts', 'boundary');
    await queryInterface.removeColumn('regions', 'boundary');
  }
};
