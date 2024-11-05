'use strict';

const cheerio = require('cheerio');
const qs = require('qs');

// parse html / write the data to the database
module.exports = {

  name: function() {
    return "Status"
  },

  parse_html_and_save: function(html_data, Status) {

    var st_table = new Array();
    st_table["SCHALTPROGRAMM AKTIV"] = "schaltprogramm_aktiv";
    st_table["HEIZEN"] = "heizen";
    st_table["KÜHLEN"] = "kuehlen";
    st_table["WARMWASSERBEREITUNG"] = "warmwasserbereitung";
    st_table["VERDICHTER"] = "verdichter";
    st_table["ABTAUEN-LL-WT"] = "abtauen_ll_wt";
    st_table["HEIZKREISPUMPE"] = "heizkreispumpe";
    st_table["LÜFTER"] = "luefter"
    st_table["HD-WÄCHTER"] = "hd_waechter";
    st_table["EVU-SPERRE"] = "evu_sperre";
    st_table["SERVICE"] = "service";
    st_table["FILTERWECHSEL \\(BEIDE\\)"] = "filterwechsel_beide";
    st_table["FILTERWECHSEL \\(ABLUFT\\)"] = "filterwechsel_abluft";
    st_table["FILTERWECHSEL \\(ZULUFT\\)"] = "filterwechsel_zuluft";
    st_table["FILTERWECHSEL"] = "filterwechsel_beide";

    // get a new data set
    var s_entry = new Status();

    // parse it with cheerio
    var $ = cheerio.load(html_data);

    $('th[class~="round-top"]').each(function(i, elem) { 
      var st_type = null;
      if ($(elem).text() == "BETRIEBSSTATUS") {
        st_type = "bs_";
      } else {
        st_type = "ps_";
      }
      $(elem).closest('table').find('td[class~="key"]').each(function(j, jelem) {
        var key = $(jelem).text();

        for (var st in st_table) {
          var r = new RegExp(st, "i");
          if (key.match(r)) {
            s_entry[st_type + st_table[st]] = 1;
           // We found a match, lets break.
           break;
          }
        }
      })
    });
    s_entry.save();
  }
};

// vim: ts=2 sw=2 sts=2 et
