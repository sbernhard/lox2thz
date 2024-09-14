'use strict';

const cheerio = require('cheerio');
const qs = require('qs');

// parse html / write the data to the database
module.exports = {

  name: function() {
    return "Heatpump"
  },

  parse_html_and_save: function(html_data, Heatpump) {

    // get a new data set
    var hp_entry = new Heatpump();    

    // parse it with cheerio
    var $ = cheerio.load(html_data);

    $('td[class~="key"]').each(function(i, elem) {
      var key = $(this).text();
      var value = $(this).next().text();
      var floatValue = parseFloat((value.replace(/,/,'.')));

      //console.log(key + " => " + floatValue);

      switch (key) {
        case 'HEISSGASTEMP.':
          hp_entry.heissgastemp = floatValue;
          break;
        case 'HOCHDRUCK':
          hp_entry.hochdruck = floatValue;
          break;
        case 'NIEDERDRUCK':
          hp_entry.niederdruck = floatValue;
          break;
        case 'VERDAMPFERTEMP.':
          hp_entry.verdampfertemp = floatValue;
          break;
        case 'VERFLÜSSIGERTEMP.':
          hp_entry.verfluessigertemp = floatValue;
          break;
        case 'FORTLUFT IST LÜFTERDREHZAHL':
          hp_entry.fortluft_ist = floatValue;
          break;
        case 'FORTLUFT SOLL VOLUMENSTROM':
          hp_entry.fortluft_soll = floatValue;
          break;
        case 'VERDICHTERSTARTS':
          hp_entry.verdichterstarts = floatValue;
          break;
        case 'WM HEIZEN TAG':
          hp_entry.wm_heizen_tag = floatValue;
          break;
        case 'WM HEIZEN SUMME':
          hp_entry.wm_heizen_summe = floatValue;
          break;
        case 'WM WW TAG':
          hp_entry.wm_ww_tag = floatValue;
          break;
        case 'WM WW SUMME':
          hp_entry.wm_ww_summe = floatValue;
          break;
        case 'WM NE HEIZEN SUMME':
          hp_entry.wm_ne_heizen_summe = floatValue;
          break;
        case 'WM NE WW SUMME':
          hp_entry.wm_ne_ww_summe = floatValue;
          break;
        case 'WM WRG TAG':
          hp_entry.wm_wrg_tag = floatValue;
          break;
        case 'WM WRG SUMME':
          hp_entry.wm_wrg_summe = floatValue;
          break;
        case 'WM SOLAR HZ TAG':
          hp_entry.wm_solar_hz_tag = floatValue;
          break;
        case 'WM SOLAR HZ SUMME':
          hp_entry.wm_solar_hz_summe = floatValue;
          break;
        case 'WM SOLAR WW TAG':
          hp_entry.wm_solar_ww_tag = floatValue;
          break;
        case 'WM SOLAR WW SUMME':
          hp_entry.wm_solar_ww_summe = floatValue;
          break;
        case 'WM KÜHLEN SUMME':
          hp_entry.wm_kuehlen_summe = floatValue;
          break;
        case 'P HEIZUNG TAG':
          hp_entry.p_heizung_tag = floatValue;
          break;
        case 'P HEIZUNG SUMME':
          hp_entry.p_heizung_summe = floatValue;
          break;
        case 'P WW TAG':
          hp_entry.p_ww_tag = floatValue;
          break;
        case 'VERDICHTER HEIZEN':
          hp_entry.verdichter_heizen = floatValue;
          break;
        case 'VERDICHTER KÜHLEN':
          hp_entry.verdichter_kuehlen = floatValue;
          break;
        case 'VERDICHTER WW':
          hp_entry.verdichter_ww = floatValue;
          break;
        case 'ELEKTR. NE HEIZEN':
          hp_entry.elektr_ne_heizen = floatValue;
          break;
        case 'ELEKTR. NE WW':
          hp_entry.elektr_ne_ww = floatValue;
          break;
        default:
          break;
      }
    });
    hp_entry.save();
  }
};


// vim: ts=2 sw=2 sts=2 et    
