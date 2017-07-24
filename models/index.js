var Sequelize = require('sequelize');
var config = require('config');

// initialize database connection
var sequelize = new Sequelize('sqlite://' + config.get('database.path'));

// load models
var models = [
  'Heatpump',
  'System'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// export connection
module.exports.sequelize = sequelize;
