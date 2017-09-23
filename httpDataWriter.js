'use strict';

const http = require('http');

class httpDataWriter {

  constructor(hostname, port, username, password) {
    this.hostname = hostname;
    this.port = port;
    this.path = "/save.php";
    this.username = username;
    this.password = password;
  }

  setValue(cookie, key, value, resp_callback) {
    var html_response = '';
    var agent = new http.Agent();

		var thz_option = [{
			"name":  key,
			"value": value
		}]

		var post_data = 'data='+ JSON.stringify(thz_option);

    var options = {
      hostname: this.hostname,
      port: this.port,
      path: this.path,
      method: 'POST',
      agent: agent,
      headers: {
        'Cookie': cookie,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
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

		//Write our post data to the request
		request.write(post_data);

    // (s)end the request
    request.end();

    // debug: agent information
    //console.dir(agent);

    return html_response;
  }
};

module.exports = httpDataWriter;

// vim: ts=2 sw=2 sts=2 et
