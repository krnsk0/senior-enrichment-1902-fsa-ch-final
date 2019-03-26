'use strict';

const router = require('express').Router();
const Campus = require('../db/campus');

const randomInt = length => {
  return Math.floor(Math.random() * length);
};

router.get('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.json(allCampuses);
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const { dataValues } = await Campus.create({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      imageUrl: `/images/${randomInt(10) + 1}.png`
    });
    // console.log('sever side result of Campus.create', dataValues);
    // TODO: handle failed validation
    res.json(dataValues);
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
