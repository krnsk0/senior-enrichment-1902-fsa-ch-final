const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
});

// add a random campus image if there isn't one
const randomInt = length => {
  return Math.floor(Math.random() * length);
};
Campus.beforeValidate(campus => {
  if (!campus.imageUrl) {
    campus.imageUrl = `/images/${randomInt(10) + 1}.png`;
  }
});

module.exports = Campus;
