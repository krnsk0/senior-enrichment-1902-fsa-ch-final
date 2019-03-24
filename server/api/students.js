'use strict';

const router = require('express').Router();
const Student = require('../db/student');

router.use('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.use('/:studentId', async (req, res, next) => {
  try {
    const oneStudent = await Student.findById(req.params.studentId);
    res.json(oneStudent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
