const http = require('http');
const express = require('express');
const basicAuth = require('basic-auth-connect');
const config = require('config');
const Sequelize = require('sequelize');
const qs = require('qs');
const util = require('util');
const cookie = require('cookie');
const models = require('./models');
const hpC = require('./controllers/heatpump_controller.js');
const systemC = require('./controllers/system_controller.js');
const httpDataCollector = require('./httpDataCollector.js');

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

// collect the data
function collect_data(collector, controller, model, cookie) {
  collector.collect(cookie, function(html_data) {
  console.log("Collect and write "+ controller.name() + " data from heatpump at "+ new Date().toLocaleString());
    controller.parse_html_and_save(html_data, model);
  });
}

// collect the System data
setInterval(function() { 
  var System = models.System;
  var Heatpump = models.Heatpump;

  console.log("Sending auth request for "+ config.get('thz.username') + " to "+ config.get('thz.host'));
  var request = http.request(authOptions, function(response) {
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
  });

  // Error handling (e.g. host not reachable)
  request.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  }); 

  // write the authData
  request.write(authData);

  // (s)end the request
  request.end();
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
    data += generate_output_line(entries[0], "p_heizung_tag");
    data += generate_output_line(entries[0], "p_heizung_summe");
    data += generate_output_line(entries[0], "p_ww_tag");
    data += generate_output_line(entries[0], "verdichter_heizen");
    data += generate_output_line(entries[0], "verdichter_kuehlen");
    data += generate_output_line(entries[0], "verdichter_ww");
    data += generate_output_line(entries[0], "elektr_ne_heizen");

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

// HTTP listen 
http.createServer(app).listen(config.get('httpServer.port'), '0.0.0.0');

// vim: ts=2 sw=2 sts=2 et    
