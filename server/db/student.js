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
    type: Sequelize.FLOAT,
    validate: {
      isGPA: function(value) {
        if (value > 4) {
          throw new Error('Validation max on gpa');
        }
        if (value < 0) {
          throw new Error('Validation min on gpa');
        }
      }
    }
  }
});

module.exports = Student;
