const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/placeholder.png' //TODO
  },
  gpa: {
    type: Sequelize.FLOAT
  }
});

module.exports = Student;
