'use strict';

module.exports = function(sequelize, DataTypes) {
  
  // define the model
  var Heatpump = sequelize.define('heatpump', {
    heissgastemp: { type: DataTypes.FLOAT },
    hochdruck: { type: DataTypes.FLOAT },
    niederdruck: { type: DataTypes.FLOAT },
    verdampfertemp: { type: DataTypes.FLOAT },
    verfluessigertemp: { type: DataTypes.FLOAT },
    fortluft_ist: { type: DataTypes.FLOAT },
    fortluft_soll: { type: DataTypes.FLOAT },
    verdichterstarts: { type: DataTypes.FLOAT },
    wm_heizen_tag: { type: DataTypes.FLOAT },
    wm_heizen_summe: { type: DataTypes.FLOAT },
    wm_ww_tag: { type: DataTypes.FLOAT },
    wm_ww_summe: { type: DataTypes.FLOAT },
    wm_ne_heizen_summe: { type: DataTypes.FLOAT },
    wm_ne_ww_summe: { type: DataTypes.FLOAT },
    wm_wrg_tag: { type: DataTypes.FLOAT },
    wm_wrg_summe: { type: DataTypes.FLOAT },
    wm_solar_hz_tag: { type: DataTypes.FLOAT },
    wm_solar_hz_sume: { type: DataTypes.FLOAT },
    wm_solar_ww_tag: { type: DataTypes.FLOAT },
    wm_kuehlen_summe: { type: DataTypes.FLOAT },
    p_heizung_tag: { type: DataTypes.FLOAT },
    p_heizung_summe: { type: DataTypes.FLOAT },
    p_ww_tag: { type: DataTypes.FLOAT },
    verdichter_heizen: { type: DataTypes.FLOAT },
    verdichter_kuehlen: { type: DataTypes.FLOAT },
    verdichter_ww: { type: DataTypes.FLOAT },
    elektr_ne_heizen: { type: DataTypes.FLOAT },
    elektr_ne_ww: { type: DataTypes.FLOAT }
  });

  // create the datebase table
  Heatpump.sync();

  return Heatpump;
};
