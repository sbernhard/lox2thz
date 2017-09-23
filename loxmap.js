'use strict';

var loxmap = new Object();
loxmap = {
  start: {
    betriebsart: {
      key: 'val39', type: 'selection', selection: {
        notbetrieb: 4, bereitschaft: 1, tagbetrieb: 3, absenkbetrieb: 4, warmwasser: 5, automatik: 11, handbetrieb: 14
      }
    }
  },
  lueftungsstufen: {
    stufe_tag: { key: 'val82', type: 'int', min: 0, max: 3 },
    stufe_nacht: { key: 'val83', type: 'int', min: 0, max: 3 },
    stufe_bereitschaft: { key: 'val84', type: 'int', min: 0, max: 3 },
    stufe_party: { key: 'val85', type: 'int', min: 0, max: 3 },
    stufe_hand: { key: 'val188', type: 'int', min: 0, max: 3 }
  },
  passivkuehlung: {
    passivkuehlung: {
      key: 'val90', type: 'selection', selection: {
        aus: 0, ablueften: 1, zulueften: 2, bypass: 3, sommerkasette: 4
      }
    }
  },
  raumtemp_hk1: {
    raumtemp_tag: { key: 'val5', type: 'double', min: 10, max: 30 },
    raumtemp_nacht: { key: 'val7', type: 'double', min: 10, max: 30 },
    raumtemp_bereitschft: { key: 'val58', type: 'double', min: 10, max: 30 },
    heizkreissoll_hand: { key: 'val54', type: 'double', min: 10, max: 65 }
  },
  heizkurve_hk1: {
    steigung: { key: 'val35', type: 'double', min: 0, max: 5 },
    fusspunkt: { key: 'val16', type: 'double', min: 0, max: 20 },
    raumeinfluss: { key: 'val37', type: 'int', min: 0, max: 100 },
    anteil_vorlauf: { key: 'val127', type: 'int', min: 0, max: 20 },
    hk_temp_soll_max: { key: 'val22', type: 'double', min: 10, max: 65 },
    hk_temp_soll_min: { key: 'val56', type: 'double', min: 10, max: 65 }
  },
  raumtemp_hk2: {
    raumtemp_tag: { key: 'val6', type: 'double', min: 10, max: 30 },
    raumtemp_nacht: { key: 'val8', type: 'double', min: 10, max: 30 },
    raumtemp_bereitschft: { key: 'val59', type: 'double', min: 10, max: 30 },
    heizkreissoll_hand: { key: 'val55', type: 'double', min: 10, max: 65 }
  },
  hysteresen: {
    hysterese1: { key: 'val162', type: 'double', min: 0, max: 10 },
    hysterese2: { key: 'val163', type: 'double', min: 0, max: 10 },
    hysterese3: { key: 'val164', type: 'double', min: 0, max: 10 },
    hysterese4: { key: 'val165', type: 'double', min: 0, max: 10 },
    hysterese5: { key: 'val166', type: 'double', min: 0, max: 10 },
    asymetrie_d_hyst: { key: 'val167', type: 'double', min: 0, max: 10 }
  },
  heizkurve_hk2: {
    steigung: { key: 'val36', type: 'double', min: 0, max: 5 },
    fusspunkt: { key: 'val129', type: 'double', min: 0, max: 20 },
    raumeinfluss: { key: 'val38', type: 'int', min: 0, max: 100 },
    hk_temp_soll_max: { key: 'val23', type: 'double', min: 10, max: 65 },
    hk_temp_soll_min: { key: 'val57', type: 'double', min: 10, max: 65 }
  },
  warmwasser_temp: {
    ww_soll_tag: { key: 'val17', type: 'double', min: 10, max: 55 },
    ww_soll_nacht: { key: 'val161', type: 'double', min: 10, max: 55 },
    ww_soll_bereitschaft: { key: 'val102', type: 'double', min: 10, max: 55 },
    ww_soll_handbetrieb: { key: 'val101', type: 'double', min: 10, max: 55 }
  }
}

module.exports = loxmap;

// vim: ts=2 sw=2 sts=2 et
