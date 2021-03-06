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
    res.json(dataValues);
  } catch (error) {
    next(error);
  }
});

router.delete('/:campusId(\\d+)', async (req, res, next) => {
  try {
    const result = await Campus.destroy({
      where: {
        id: req.params.campusId
      }
    });
    res.status(202).send('');
  } catch (error) {
    next(error);
  }
});

router.put('/:campusId(\\d+)', async (req, res, next) => {
  try {
    await Campus.update(
      { ...req.body },
      { where: { id: req.params.campusId } }
    );
    const oneCampusWithStudents = await Campus.findById(req.params.campusId, {
      include: 'students'
    });
    res.json(oneCampusWithStudents);
  } catch (error) {
    next(error);
  }
});

router.get('/:campusId(\\d+)', async (req, res, next) => {
  try {
    const oneCampusWithStudents = await Campus.findById(req.params.campusId, {
      include: 'students'
    });
    if (oneCampusWithStudents === null) throw new Error('record not found');
    res.json(oneCampusWithStudents);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
