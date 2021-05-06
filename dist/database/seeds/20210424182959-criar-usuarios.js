"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@gmail.com',
        password_hash: await bcryptjs.hash('35741294', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'John Doe 1',
        email: 'john1@gmail.com',
        password_hash: await bcryptjs.hash('35741294', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'John Doe2',
        email: 'john2@gmail.com',
        password_hash: await bcryptjs.hash('35741294', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async () => {

  },
};
