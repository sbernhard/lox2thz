# Get / Set Tecalor THZ 304 SOL values by using ISG Web Edit

## USE AT YOUR OWN RISK

## Requirements
- nodejs
- Tecalor ISG-Web
- Tecalor 304 SOL (works maybe on Stiebel Eltron 304 SOL and similar)
- *Important*: The language of your ISB-Web must be set to German (Deutsch) as lox2thz does parse the ISG-Web HTML document.

## Installation
```sh
npm install
```

## Configuration
Have a look at config/default.json

## Start with
```sh
nodejs lox2thz.js
```

Have a look at "pm2" for starting / stopping lox2thz. See:
http://pm2.keymetrics.io/

## HTTP Server
nodejs will start a HTTP server running on 8080 (per default)
For receiving data, start a browser and access
 - http://[ip-address]/heatpumps
 - http://[ip-address]/systems

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

## USE AT YOUR OWN RISK

# Copyright

Copyright(c) 2017 Bernhard Suttner / http://www.bernhard-suttner.de

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
