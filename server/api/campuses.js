'use strict';

const router = require('express').Router();
const Campus = require('../db/campus');

router.get('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.json(allCampuses);
  } catch (error) {
    next(error);
  }
});

router.get('/:campusId', async (req, res, next) => {
  try {
    const oneCampusWithStudents = await Campus.findById(req.params.campusId, {
      include: 'students'
    });
    res.json(oneCampusWithStudents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
