'use strict';

module.exports = function(sequelize, DataTypes) {

  // define the model
  var System = sequelize.define('system', {
    raumisttemp_hk1: { type: DataTypes.FLOAT },
    raumsolltemp_hk1: { type: DataTypes.FLOAT },
    raumfeuchte_hk1: { type: DataTypes.FLOAT },
    raumisttemp_hk2: { type: DataTypes.FLOAT },
    raumsolltemp_hk2: { type: DataTypes.FLOAT },
    raumfeuchte_hk2: { type: DataTypes.FLOAT },
    aussentemp: { type: DataTypes.FLOAT },
    istwert_hk1: { type: DataTypes.FLOAT },
    sollwert_hk1: { type: DataTypes.FLOAT },
    istwert_hk2: { type: DataTypes.FLOAT },
    sollwert_hk2: { type: DataTypes.FLOAT },
    vorlauftemp: { type: DataTypes.FLOAT },
    ruecklauftemp: { type: DataTypes.FLOAT },
    druck_heizkreis: { type: DataTypes.FLOAT },
    volumenstrom: { type: DataTypes.FLOAT },
    ww_isttemp: { type: DataTypes.FLOAT },
    ww_solltemp: { type: DataTypes.FLOAT },
    zuluft_ist_luefterdrehzahl: { type: DataTypes.FLOAT },
    zuluft_soll_volumenstrom: { type: DataTypes.FLOAT },
    abluft_ist_luefterdrehzahl: { type: DataTypes.FLOAT },
    abluft_soll_volumenstrom: { type: DataTypes.FLOAT },
    taupunkttemp_hk1: { type: DataTypes.FLOAT },
    taupunkttemp_hk2: { type: DataTypes.FLOAT },
    heizstufe: { type: DataTypes.FLOAT }
  });

  // create the datebase table
  System.sync();

  return System;
};
