# Get / Set Tecalor THZ 304 SOL values by using ISG Web Edit

## USE AT YOUR OWN RISK

## Requirements
- nodejs
- Tecalor ISG-Web
- Tecalor 304 SOL (works maybe on Stiebel Eltron 304 SOL and similar)

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

## HTTP Server
nodejs will start a HTTP server running on 8080 (per default)
For receiving data, start a browser and access
 - http://<ip>/heatpumps
 - http://<ip>/systems

## Loxone connection
The result data is like the following which can be easily parsed by Loxone
```
  heissgastemp:"40"
  hochdruck:"16.03" 
```

## USE AT YOUR OWN RISK

Copyright by Bernhard Suttner 
GPL License



