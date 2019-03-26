'use strict';

const router = require('express').Router();
const Student = require('../db/student');

router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { dataValues } = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gpa: req.body.gpa
    });
    // console.log('server side result of Studnet.create', dataValues);
    // TODO: handle failed valuation
    res.json(dataValues);
  } catch (error) {
    next(error);
  }
});

router.delete('/:studentId(\\d+)', async (req, res, next) => {
  try {
    const result = await Student.destroy({
      where: {
        id: req.params.studentId
      }
    });
    // TODO: handle failed destruction
    res.status(202).send('');
  } catch (error) {
    next(error);
  }
});

router.get('/:studentId(\\d+)', async (req, res, next) => {
  try {
    const oneStudent = await Student.findById(req.params.studentId, {
      include: 'campus'
    });
    if (oneStudent === null) throw new Error('record not found');
    res.json(oneStudent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
