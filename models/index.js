var Sequelize = require('sequelize');
var config = require('config');
var path = require('path');

// initialize database connection
var sequelize = new Sequelize('sqlite://' + config.get('database.path'));

// load models
var models = [
  'Heatpump',
  'System',
  'Status'
];

models.forEach(function(model) {
  let modelPath = path.join(__dirname, model);
  module.exports[model] = require(modelPath)(sequelize, Sequelize.DataTypes);
});

// export connection
module.exports.sequelize = sequelize;
