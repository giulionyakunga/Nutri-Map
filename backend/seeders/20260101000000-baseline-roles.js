'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      { name: 'administrator', created_at: new Date(), updated_at: new Date() },
      { name: 'data_analyst', created_at: new Date(), updated_at: new Date() },
      { name: 'enumerator', created_at: new Date(), updated_at: new Date() },
      { name: 'researcher', created_at: new Date(), updated_at: new Date() },
      { name: 'viewer', created_at: new Date(), updated_at: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
