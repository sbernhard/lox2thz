'use strict';

const cheerio = require('cheerio');
const qs = require('qs');

// parse html / write the data to the database
module.exports = {

  name: function() {
    return "System"
  },

  parse_html_and_save: function(html_data, System) {

    // get a new data set
    var system_entry = new System();    

    // parse it with cheerio
    var $ = cheerio.load(html_data);

    $('td[class~="key"]').each(function(i, elem) {
      var key = $(this).text();
      var value = $(this).next().text();
      var floatValue = parseFloat((value.replace(/,/,'.')));

      //console.log(key + " => " + floatValue);

      switch (key) {
        case 'RAUMISTTEMP. HK1':
          system_entry.raumisttemp_hk1 = floatValue;
          break;
        case 'RAUMSOLLTEMP. HK1':
          system_entry.raumsolltemp_hk1 = floatValue;
          break;
        case 'RAUMFEUCHTE HK1':
          system_entry.raumfeuchte_hk1 = floatValue;
          break;
        case 'RAUMISTTEMP. HK2':
          system_entry.raumisttemp_hk2 = floatValue;
          break;
        case 'RAUMSOLLTEMP. HK2':
          system_entry.raumsolltemp_hk2 = floatValue;
          break;
        case 'RAUMFEUCHTE HK2':
          system_entry.raumfeuchte_hk2 = floatValue;
          break;
        case 'AUSSENTEMPERATUR':
          system_entry.aussentemp = floatValue;
          break;
        case 'ISTWERT HK1':
          system_entry.istwert_hk1 = floatValue;
          break;
        case 'SOLLWERT HK1':
          system_entry.sollwert_hk1 = floatValue;
          break;
        case 'ISTWERT HK2':
          system_entry.istwert_hk2 = floatValue;
          break;
        case 'SOLLWERT HK2':
          system_entry.sollwert_hk2 = floatValue;
          break;
        case 'VORLAUFTEMP.':
          system_entry.vorlauftemp = floatValue;
          break;
        case 'RÜCKLAUFTEMP.':
          system_entry.ruecklauftemp = floatValue;
          break;
        case 'DRUCK HEIZKREIS':
          system_entry.druck_heizkreis = floatValue;
          break;
        case 'VOLUMENSTROM':
          system_entry.volumenstrom = floatValue;
          break;
        case 'WW-ISTTEMP.':
          system_entry.ww_isttemp = floatValue;
          break;
        case 'WW-SOLLTEMP.':
          system_entry.ww_solltemp = floatValue;
          break;
        case 'ZULUFT IST LÜFTERDREHZAHL':
          system_entry.zuluft_ist_luefterdrehzahl = floatValue;
          break;
        case 'ZULUFT SOLL VOLUMENSTROM':
          system_entry.zuluft_soll_volumenstrom = floatValue;
          break;
        case 'ABLUFT IST LÜFTERDREHZAHL':
          system_entry.abluft_ist_luefterdrehzahl = floatValue;
          break;
        case 'ABLUFT SOLL VOLUMENSTROM':
          system_entry.abluft_soll_volumenstrom = floatValue;
          break;
        case 'TAUPUNKTTEMPERATUR HK1':
          system_entry.taupunkttemp_hk1 = floatValue;
          break;
        case 'TAUPUNKTTEMPERATUR HK2':
          system_entry.taupunkttemp_hk2 = floatValue;
          break;
        case 'HEIZSTUFE':
          system_entry.heizstufe = floatValue;
          break;
        default:
          break;
      }
    });
    system_entry.save();
  }
};


// vim: ts=2 sw=2 sts=2 et    
