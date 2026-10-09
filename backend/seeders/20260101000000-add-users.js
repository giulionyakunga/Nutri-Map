
'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const firstName = 'Julio';
    const lastName = 'Nyakunga';
    const email = 'julio.nyakunga@telabs.co.tz';
    const phoneNumber = '+255766032160';
    const password = 'zy7usH8lK';
    const roleName = 'administrator';
    let roleId = null;

    // Confirm the role exists.
    const roles = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name = :roleName',
      {
        replacements: { roleName },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (roles.length === 0) {
      throw new Error(`Role "${roleName}" does not exist.`);
    } else{
      roleId = roles[0].id;
    }

    // Avoid duplicate users.
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email',
      {
        replacements: { email },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (existingUsers.length > 0) {
      console.log(`User ${email} already exists; skipping.`);
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date();

    await queryInterface.bulkInsert('users', [
      {
        first_name: firstName,
        middle_name: null,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password_hash: passwordHash,
        role_id: roleId,
        status: 'active',
        failed_login_attempts: 0,
        locked_until: null,
        last_login_at: null,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down(queryInterface) {
    const email = 'julio.nyakunga@telabs.co.tz';

    if (email) {
      await queryInterface.bulkDelete('users', { email });
    }
  }
};