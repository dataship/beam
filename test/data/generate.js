#! /usr/bin/env node
var fs = require('fs');

var DIR = "0001/";

var doric = new Float32Array(100);
var tuscan = new Uint8Array(100);
var ionic = new Uint8Array(100);
var corinthian = new Uint16Array(100);


tuscan[0] = 7;
tuscan[13] = 37;
tuscan[34] = 89;

doric[0] = 3.141592;
doric[23] = 1.010101010;
doric[78] = 2.7182818;


fs.writeFileSync(DIR + "doric.f32", new Buffer(doric.buffer));
fs.writeFileSync(DIR + "tuscan.u8", new Buffer(tuscan.buffer));
fs.writeFileSync(DIR + "ionic.k8", new Buffer(ionic.buffer));
fs.writeFileSync(DIR + "corinthian.k16", new Buffer(corinthian.buffer));
