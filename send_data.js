var http = require('http');
var qs = require('qs');

var thz_hostname = "172.23.42.149"
var thz_parameter = "val82";
var thz_value = "1"

var thz_option = [{
  "name":  thz_parameter,
  "value": thz_value
}]

var agent = new http.Agent(options);

var post_data = 'data='+ JSON.stringify(thz_option);

var options = {
    hostname: thz_hostname,
    port: 80,
    path: '/save.php',
    method: 'POST',
    agent: agent,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
};

//curl_setopt ($cu, CURLOPT_POSTFIELDS, "make=send&pass=".$isg_pw."&user=".$isg_user."");
//var postdata = qs.stringify({
//  username:"User",
//  password:"Password"
//});
//

// show response from server
var request = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('Response: ' + chunk);
  });
});

// Error handling (e.g. host not reachable)
request.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

//Write our post data to the request
request.write(post_data);


// end the request
request.end();

// debug: agent information
console.dir(agent);

// vim: ts=2 sw=2 sts=2 et    
