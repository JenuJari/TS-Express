'use strict';
const bcrypt = require("bcrypt");

const cryptPassword =  (password) => {
  const salt =  bcrypt.genSaltSync(10);
  const hash  =  bcrypt.hashSync(password,salt);
  return hash;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      first_name: 'Jenish',
      last_name: "Jariwala",
      email:"jhon.5456@gmail.com",
      password:cryptPassword("Vaishu@36"),
      type:"user",
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
