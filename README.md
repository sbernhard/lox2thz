# Get / Set Tecalor THZ 304 SOL values by using ISG Web Edit

The lox2thz project was mainly tested on a ISG Web connected to a THZ 304 SOL heat pump but it should work for other Tecalor and Stiebel Eltron heat pumps as well.
Additionally, as the project is named lox2thz, it should work with Loxone home automation system but the API can be used for other systems as well.

## USE AT YOUR OWN RISK

## Requirements
- nodejs
- Tecalor ISG-Web
- Tecalor 304 SOL (works maybe on Stiebel Eltron 304 SOL and similar)
- *Important*: The language of your ISB-Web must be set to German (Deutsch) as lox2thz does parse the ISG-Web HTML document.

## But, why?
In newer versions of the ISG-Web, its possible to use Modbus to GET/SET values as described in https://loxwiki.atlassian.net/wiki/spaces/LOX/pages/1540556607/mit+ISG+web+ber+Modifikation+des+Webservers.
After some analysis, I found out, that its not possible to set values like "Luftvolumenstrom Zuluft Stufe 1" and other settings. 
This is still the main advantage of lox2thz.

## Installation
```sh
npm install
```

## Configuration
Have a look at config/default.json and adjust the values to your Tecalor / Stiebel Eltron heat pump.

If lox2thz is used on a RaspberryPi, the recommendation is to have the sqlite database on a USB stick to reduce the write cycles on the SD card.

## Start with
```sh
nodejs lox2thz.js
```

## HTTP Server
nodejs will start a HTTP server running on 8080 (per default)
For receiving data, start a browser and access
 - http://[ip-address]/heatpumps
 - http://[ip-address]/systems
 - http://[ip-address]/status

## Loxone connection
The result data is like the following which can be easily parsed by Loxone
```
  heissgastemp:"40"
  hochdruck:"16.03" 
```

## Save values to THZ / LWZ
The following will change the ventilation to stage 2:

http://[ip-address]/set/?section=lueftungsstufen&id=stufe_tag&value=2

For a complete list of currently available keys, have a look at loxmap.js

## Loxone Configuration
![HTTP Output](/doc/http_ausgang.png)
![HTTP Output Command](/doc/http_ausgang_befehl.png)

![HTTP Input](/doc/http_eingang.png)
![HTTP Input Command](/doc/http_eingang_befehl.png)

## lox2thz startup
Use contrib/lox2thz.service as a template for your systemd startup script.
On a debian based system, copy the file to /etc/systemd/system/ and adjust the WorkingDirectory and User.

```sh
cp contrib/lox2thz.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable lox2thz
systemctl start lox2thz
```

Alternative is to use "pm2" for starting / stopping of lox2thz. See:
http://pm2.keymetrics.io/

## Cleanup script

The contrib/cleanup_old_thz_data script can be used to cleanup old values from database.
Adjust the path to the sqlite database in the script if needed.
You can install this script as a cron job by copying it to /etc/cron.daily/

```sh
mv contrib/cleanup_old_thz_data /etc/cron.daily/
chmod +x /etc/cron.daily/cleanup_old_thz_data
```

## USE AT YOUR OWN RISK

# Copyright

Copyright(c) 2017 Bernhard Suttner / https://bernhard-suttner.de

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
