'use strict';

const router = require('express').Router();
const Campus = require('../db/campus');

router.use('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.json(allCampuses);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
