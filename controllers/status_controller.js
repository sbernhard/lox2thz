'use strict';

const cheerio = require('cheerio');
const qs = require('qs');

// parse html / write the data to the database
module.exports = {

  name: function() {
    return "Status"
  },

  parse_html_and_save: function(html_data, Status) {

    // get a new data set
    var s_entry = new Status();

    // parse it with cheerio
    var $ = cheerio.load(html_data);

    $('td[class~="key"]').each(function(i, elem) {
      var key = $(this).text();
      // the value isn't interesting

      if (key.match(/SCHALTPROGRAMM/)) {
         s_entry.bs_schaltprogramm = key;
      }
      else if (key.match(/FILTERWECHSEL/)) {
         s_entry.bs_filterwechsel = key;
      }
      else if (key.match(/HD-WÄCHTER/)) {
         s_entry.ps_hd_waechter = key;
      }
      else if (key.match(/EVU-SPERRE/)) {
         s_entry.ps_evu_sperre = key;
      }
    });
    s_entry.save();
  }
};

// vim: ts=2 sw=2 sts=2 et
