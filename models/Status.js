'use strict';

module.exports = function(sequelize, DataTypes) {

  // define the model
  var Status = sequelize.define('status', {
    bs_schaltprogramm: { type: DataTypes.STRING },
    bs_filterwechsel: { type: DataTypes.STRING },
    ps_hd_waechter: { type: DataTypes.STRING },
    ps_evu_sperre: { type: DataTypes.STRING },
  });

  // create the datebase table
  Status.sync();

  return Status;
};
