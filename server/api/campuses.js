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

router.post('/', async (req, res, next) => {
  try {
    const { dataValues } = await Campus.create({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description
    });
    // console.log('sever side result of Campus.create', dataValues);
    // TODO: handle failed validation
    res.json(dataValues);
  } catch (error) {
    next(error);
  }
});

router.delete('/:campusId', async (req, res, next) => {
  console.log('in delete route');
  try {
    const result = await Campus.destroy({
      where: {
        id: req.params.campusId
      }
    });
    // TODO: handle failed destruction
    res.status(202).send('');
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
