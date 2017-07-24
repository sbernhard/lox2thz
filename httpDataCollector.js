'use strict';

const http = require('http');
const qs = require('qs');

class httpDataCollector {

  constructor(hostname, port, path, username, password) {
    this.hostname = hostname;
    this.port = port;
    this.path = path;
    this.username = username;
    this.password = password;
  }

  collect(cookie, resp_callback) {
    var html_response = '';
    var agent = new http.Agent();

    var options = {
      hostname: this.hostname,
      port: this.port,
      path: this.path,
      method: 'GET',
      agent: agent,
      headers: {
        'Cookie': cookie,
        'Connection': 'keep-alive'
      }
    };

    // show response from server
    var request = http.request(options, function(response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        html_response = html_response + chunk;
      });

      response.on('end', function () {
        //console.log(html_response);
        resp_callback(html_response);
      });
    });

    // Error handling (e.g. host not reachable)
    request.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // (s)end the request
    request.end();

    // debug: agent information
    //console.dir(agent);

    return html_response;
  }
};

module.exports = httpDataCollector;

// vim: ts=2 sw=2 sts=2 et 
