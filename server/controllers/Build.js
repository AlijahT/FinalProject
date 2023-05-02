const models = require('../models');

const { Build } = models;

const makerPage = async (req, res) => res.render('app');

const makeBuild = async (req, res) => {
  if (!req.body.buildName || !req.body.cost || !req.body.blaster || !req.body.spring
    || !req.body.barrel || !req.body.additional) {
    return res.status(400).json({ error: 'All Fields Are Required!' });
  }

  const buildData = {
    buildName: req.body.buildName,
    cost: req.body.cost,
    blaster: req.body.blaster,
    spring: req.body.spring,
    barrel: req.body.barrel,
    additional: req.body.additional,
    nerfer: req.session.account._id,
  };

  try {
    const newBuild = new Build(buildData);
    newBuild.save();
    return res.status(201).json({
      buildName: newBuild.buildName,
      cost: newBuild.cost,
      blaster: newBuild.blaster,
      spring: newBuild.spring,
      barrel: newBuild.barrel,
      additional: newBuild.additional,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'You have already made this build!' });
    }
    return res.status(500).json({ error: 'An error occured while creating your build' });
  }
};

const getBuilds = async (req, res) => {
  try {
    const query = { nerfer: req.session.account._id };
    const docs = await Build.find(query).select('buildName cost blaster spring barrel additional')
    .lean().exec();
    return res.json({ builds: docs });
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving builds!' });
  }
};

module.exports = {
  makerPage,
  makeBuild,
  getBuilds,
};