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

// error handling
router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
