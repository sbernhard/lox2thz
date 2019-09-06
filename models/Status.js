'use strict';

module.exports = function(sequelize, DataTypes) {

  // define the model
  var Status = sequelize.define('status', {
    bs_schaltprogramm_aktiv: { type: DataTypes.INTEGER },
    bs_heizen: { type: DataTypes.INTEGER },
    bs_kuehlen: { type: DataTypes.INTEGER },
    bs_warmwasserbereitung: { type: DataTypes.INTEGER },
    bs_verdichter: { type: DataTypes.INTEGER },
    bs_abtauen_ll_wt: { type: DataTypes.INTEGER },
    bs_heizkreispumpe: { type: DataTypes.INTEGER },
    bs_luefter: { type: DataTypes.INTEGER },
    bs_hd_waechter: { type: DataTypes.INTEGER },
    bs_evu_sperre: { type: DataTypes.INTEGER },
    bs_service: { type: DataTypes.INTEGER },
    bs_filterwechsel_beide: { type: DataTypes.INTEGER },
    bs_filterwechsel_abluft: { type: DataTypes.INTEGER },
    bs_filterwechsel_zuluft: { type: DataTypes.INTEGER },

    ps_schaltprogramm_aktiv: { type: DataTypes.INTEGER },
    ps_heizen: { type: DataTypes.INTEGER },
    ps_kuehlen: { type: DataTypes.INTEGER },
    ps_warmwasserbereitung: { type: DataTypes.INTEGER },
    ps_verdichter: { type: DataTypes.INTEGER },
    ps_abtauen_ll_wt: { type: DataTypes.INTEGER },
    ps_heizkreispumpe: { type: DataTypes.INTEGER },
    ps_luefter: { type: DataTypes.INTEGER },
    ps_hd_waechter: { type: DataTypes.INTEGER },
    ps_evu_sperre: { type: DataTypes.INTEGER },
    ps_service: { type: DataTypes.INTEGER },
    ps_filterwechsel_beide: { type: DataTypes.INTEGER },
    ps_filterwechsel_abluft: { type: DataTypes.INTEGER },
    bs_filterwechsel_zuluft: { type: DataTypes.INTEGER },
  });

  // create the datebase table
  Status.sync();

  return Status;
};
