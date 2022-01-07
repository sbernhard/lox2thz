const http = require('http');
const express = require('express');
const basicAuth = require('basic-auth-connect');
const config = require('config');
const Sequelize = require('sequelize');
const validator = require('validator');
const qs = require('qs');
const util = require('util');
const models = require('./models');
const hpC = require('./controllers/heatpump_controller.js');
const systemC = require('./controllers/system_controller.js');
const statusC = require('./controllers/status_controller.js');
const httpDataCollector = require('./httpDataCollector.js');
const httpDataWriter = require('./httpDataWriter.js');
const loxmap = require('./loxmap.js');

// initialize the app
const app = express();

// set authentication
app.use(basicAuth(config.get('httpServer.username'), config.get('httpServer.password')));

// set the authData
var authData = qs.stringify({
  user: config.get('thz.username'),
  pass: config.get('thz.password'),
  make: 'send'
});

// set the authOptions
var authOptions = {
  host: config.get('thz.host'),
  port: config.get('thz.port'),
  path: '/?s=0',
  method: 'POST',
  headers: {
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(authData)
  }
};

// construct httpDataCollector for heatpumps data
var collectorHeatpumps = new httpDataCollector(
    config.get('thz.host'),
    config.get('thz.port'),
    config.get('modules.heatpump'),
    config.get('thz.username'),
    config.get('thz.password')
    );

// construct httpDataCollector for system data
var collectorSystems = new httpDataCollector(
    config.get('thz.host'),
    config.get('thz.port'),
    config.get('modules.system'),
    config.get('thz.username'),
    config.get('thz.password')
    );

// construct httpDataCollector for status data
var collectorStatus = new httpDataCollector(
    config.get('thz.host'),
    config.get('thz.port'),
    config.get('modules.status'),
    config.get('thz.username'),
    config.get('thz.password')
    );

// collect the data
function collect_data(collector, controller, model, cookie) {
  collector.collect(cookie, function(html_data) {
  console.log("Collect and write "+ controller.name() + " data from heatpump at "+ new Date().toLocaleString());
    controller.parse_html_and_save(html_data, model);
  });
}

// send auth request
function auth(resp_callback) {
  console.log("Sending auth request for "+ config.get('thz.username') + " to "+ config.get('thz.host'));
  var request = http.request(authOptions, resp_callback);

  // Error handling (e.g. host not reachable)
  request.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write the authData
  request.write(authData);

  // (s)end the request
  request.end();
}

// collect the System data
setInterval(function() {
  var System = models.System;
  var Heatpump = models.Heatpump;
  var Status = models.Status;

  var request = auth(function(response) {
    var cookie = response.headers['set-cookie'];
    var html_response = '';

    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      html_response = html_response + chunk;
    });

    response.on('end', function () {
      //console.log(html_response);
    });

    //console.log("Cookie is "+ cookie);
    collect_data(collectorSystems, systemC, System, cookie);
    collect_data(collectorHeatpumps, hpC, Heatpump, cookie);
    collect_data(collectorStatus, statusC, Status, cookie);
  });
}, config.get('dataCollector.interval')*1000);


// generate one output line and return it
function generate_output_line(storage, key) {
  var value = 0;
  if (storage[key] != null) {
    value = storage[key];
  }
  return key + ":\""+ value + "\"\n";
}

// handle the /heatpumps request
app.get('/heatpumps', function(request, response) {
  var key = request.query.key;
  var Heatpump = models.Heatpump;

  Heatpump.findAll({
    limit: 1,
    where: {
      // your where conditions, or without them if you need ANY entry
    },
    order: [['id', 'DESC']]
  }).then(entries => {
    var data = "";
    data += generate_output_line(entries[0], "heissgastemp");
    data += generate_output_line(entries[0], "hochdruck");
    data += generate_output_line(entries[0], "niederdruck");
    data += generate_output_line(entries[0], "verdampfertemp");
    data += generate_output_line(entries[0], "verfluessigertemp");
    data += generate_output_line(entries[0], "fortluft_ist");
    data += generate_output_line(entries[0], "fortluft_soll");
    data += generate_output_line(entries[0], "verdichterstarts");
    data += generate_output_line(entries[0], "wm_heizen_tag");
    data += generate_output_line(entries[0], "wm_heizen_summe");
    data += generate_output_line(entries[0], "wm_ww_tag");
    data += generate_output_line(entries[0], "wm_ww_summe");
    data += generate_output_line(entries[0], "wm_ne_heizen_summe");
    data += generate_output_line(entries[0], "wm_ne_ww_summe");
    data += generate_output_line(entries[0], "wm_wrg_tag");
    data += generate_output_line(entries[0], "wm_wrg_summe");
    data += generate_output_line(entries[0], "wm_solar_hz_tag");
    data += generate_output_line(entries[0], "wm_solar_hz_sume");
    data += generate_output_line(entries[0], "wm_solar_ww_tag");
    data += generate_output_line(entries[0], "wm_solar_ww_summe");
    data += generate_output_line(entries[0], "wm_kuehlen_summe");
    data += generate_output_line(entries[0], "p_heizung_tag");
    data += generate_output_line(entries[0], "p_heizung_summe");
    data += generate_output_line(entries[0], "p_ww_tag");
    data += generate_output_line(entries[0], "verdichter_heizen");
    data += generate_output_line(entries[0], "verdichter_kuehlen");
    data += generate_output_line(entries[0], "verdichter_ww");
    data += generate_output_line(entries[0], "elektr_ne_heizen");
    data += generate_output_line(entries[0], "elektr_ne_ww");

    response.send(data)
  });
});

// handle the /systems request
app.get('/systems', function(request, response) {
  var key = request.query.key;
  var System = models.System;

  System.findAll({
    limit: 1,
    where: {
      // your where conditions, or without them if you need ANY entry
    },
    order: [['id', 'DESC']]
  }).then(entries => {
    var data = "";

    data += generate_output_line(entries[0], "raumisttemp_hk1");
    data += generate_output_line(entries[0], "raumsolltemp_hk1");
    data += generate_output_line(entries[0], "raumfeuchte_hk1");
    data += generate_output_line(entries[0], "raumisttemp_hk2");
    data += generate_output_line(entries[0], "raumsolltemp_hk2");
    data += generate_output_line(entries[0], "raumfeuchte_hk2");
    data += generate_output_line(entries[0], "aussentemp");
    data += generate_output_line(entries[0], "istwert_hk1");
    data += generate_output_line(entries[0], "sollwert_hk1");
    data += generate_output_line(entries[0], "istwert_hk2");
    data += generate_output_line(entries[0], "sollwert_hk2");
    data += generate_output_line(entries[0], "vorlauftemp");
    data += generate_output_line(entries[0], "ruecklauftemp");
    data += generate_output_line(entries[0], "druck_heizkreis");
    data += generate_output_line(entries[0], "volumenstrom");
    data += generate_output_line(entries[0], "ww_isttemp");
    data += generate_output_line(entries[0], "ww_solltemp");
    data += generate_output_line(entries[0], "zuluft_ist_luefterdrehzahl");
    data += generate_output_line(entries[0], "zuluft_soll_volumenstrom");
    data += generate_output_line(entries[0], "abluft_ist_luefterdrehzahl");
    data += generate_output_line(entries[0], "abluft_soll_volumenstrom");
    data += generate_output_line(entries[0], "taupunkttemp_hk1");
    data += generate_output_line(entries[0], "taupunkttemp_hk2");
    data += generate_output_line(entries[0], "heizstufe");

    response.send(data)
  });
});

// handle the /status request
app.get('/status', function(request, response) {
  var key = request.query.key;
  var Status = models.Status;

  Status.findAll({
    limit: 1,
    where: {
      // your where conditions, or without them if you need ANY entry
    },
    order: [['id', 'DESC']]
  }).then(entries => {
    var data = "";

    data += generate_output_line(entries[0], "bs_schaltprogramm_aktiv");
    data += generate_output_line(entries[0], "bs_heizen");
    data += generate_output_line(entries[0], "bs_kuehlen");
    data += generate_output_line(entries[0], "bs_warmwasserbereitung");
    data += generate_output_line(entries[0], "bs_verdichter");
    data += generate_output_line(entries[0], "bs_abtauen_ll_wt");
    data += generate_output_line(entries[0], "bs_heizkreispumpe");
    data += generate_output_line(entries[0], "bs_luefter");
    data += generate_output_line(entries[0], "bs_hd_waechter");
    data += generate_output_line(entries[0], "bs_evu_sperre");
    data += generate_output_line(entries[0], "bs_service");
    data += generate_output_line(entries[0], "bs_filterwechsel_beide");
    data += generate_output_line(entries[0], "bs_filterwechsel_abluft");
    data += generate_output_line(entries[0], "bs_filterwechsel_zuluft");

    data += generate_output_line(entries[0], "ps_schaltprogramm_aktiv");
    data += generate_output_line(entries[0], "ps_heizen");
    data += generate_output_line(entries[0], "ps_kuehlen");
    data += generate_output_line(entries[0], "ps_warmwasserbereitung");
    data += generate_output_line(entries[0], "ps_verdichter");
    data += generate_output_line(entries[0], "ps_abtauen_ll_wt");
    data += generate_output_line(entries[0], "ps_heizkreispumpe");
    data += generate_output_line(entries[0], "ps_luefter");
    data += generate_output_line(entries[0], "ps_hd_waechter");
    data += generate_output_line(entries[0], "ps_evu_sperre");
    data += generate_output_line(entries[0], "ps_service");
    data += generate_output_line(entries[0], "ps_filterwechsel_beide");
    data += generate_output_line(entries[0], "ps_filterwechsel_abluft");
    data += generate_output_line(entries[0], "bs_filterwechsel_zuluft");
    response.send(data)
  });
});

// handle the /status request
// validate a loxmap entries if value is allowed
function validate_value(entry, value) {
  var result = false;

  if (entry !== undefined) {

    switch (entry['type']) {
      case 'int':
        result = validator.isInt(value, { min: entry['min'], max: entry['max'] })
          break;

      case 'double':
        result = validator.isFloat(value.replace(',','.'), { min: entry['min'], max: entry['max'] })
          break;

      case 'selection':
        result = value in entry['selection'];
        break;
    }
  }

  return result;
}

// handle the /set requests
app.get('/set', function(request, response) {
  var section = request.query.section;
  var id = request.query.id;
  var value = request.query.value;

  if (value !== undefined && value != "") {
    console.log("section is: "+ section + " id is: "+ id + " value is: "+ value);

    var entry = loxmap[section][id];
    if (entry !== undefined) {

      if (validate_value(entry, value)) {
        console.log("Yes "+ value +" is valid for "+ section + "/"+ id);

        // get the real thz value for the selection value (e.g. 1 for 'ablueften'
        if (entry['type'] == 'selection') {
          value = entry['selection'][value]; 
        }

        var dataWriter = new httpDataWriter(
            config.get('thz.host'),
            config.get('thz.port'),
            config.get('thz.username'),
            config.get('thz.password')
            );

        var request = auth(function(auth_response) {
          var cookie = auth_response.headers['set-cookie'];
          var html_response = '';

          auth_response.setEncoding('utf8');
          auth_response.on('data', function (chunk) {
            html_response = html_response + chunk;
          });

          auth_response.on('end', function () {
            //console.log(html_response);
          });

          //console.log("Cookie is "+ cookie);

          dataWriter.setValue(cookie, entry['key'], value, function(html_data) {
            console.log("Saving key "+ section + "/" + id + " ("+ entry['key'] + ") with value "+ value + " was "+ html_data);

            // parse return value to JSON obj
            html_obj = JSON.parse(html_data);

            if (html_obj.success === true) {
              response.send("success");
            } else {
              response.send("failed");
            }
          });
        });
      } else {
        response.send("NOPE! "+ value +" is NOT valid for "+ section + "/"+ id);
      }
    } else {
      response.send("NOPE! "+ section + "/"+ id + " was not defined yet!");
    }
  } else {
    response.send("NOPE! Value must be set for "+ section + "/"+ id);
  }
});

// HTTP listen
http.createServer(app).listen(config.get('httpServer.port'), '0.0.0.0');

// vim: ts=2 sw=2 sts=2 et
