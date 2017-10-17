var tape = require('tape'),
	beam = require('../lib/beam.js');


var dir = "./test/data/0001/";
var index = {
	"doric" : "doric.f32",
	"tuscan" : "tuscan.u8",
	"ionic" : "ionic.k8",
	"corinthian" : "corinthian.k16"
};

tape("correct number of columns and keys", function(t){
	t.plan(2);

	beam.load(dir, index, function(err, results){

		if(err) t.fail(err);

		t.equal(Object.keys(results.columns).length, 4, "correct number of data columns loaded");
		t.equal(Object.keys(results.keys).length, 2, "correct number of key columns loaded");
	});
});

tape("correctly named columns", function(t){
	t.plan(4);

	beam.load(dir, index, function(err, results){

		t.assert("doric" in results.columns, "column present");
		t.assert("tuscan" in results.columns, "column present");
		t.assert("ionic" in results.columns, "column present");
		t.assert("corinthian" in results.columns, "column present");
	});
});

tape("correctly named keys", function(t){
	t.plan(2);

	beam.load(dir, index, function(err, results){

		t.assert("ionic" in results.keys, "key present");
		t.assert("corinthian" in results.keys, "key present");
	});
});

function type(obj){ return Object.prototype.toString.call(obj).slice(8, -1); }

tape("float32 column has correct type", function(t){
	t.plan(1);

	beam.load(dir, index, function(err, results){

		var doric = results.columns["doric"];

		t.equal(type(doric), "Float32Array", "type correct");
	});
});

var RTOL = 1e-05,
	ATOL = 1e-07;

function close(a, b){
	return Math.abs(a - b) <= ATOL + RTOL * Math.abs(b);
}

tape("float32 column has correct values", function(t){
	t.plan(3);

	beam.load(dir, index, function(err, results){

		var doric = results.columns["doric"];

		t.assert(close(doric[0], 3.14159), "values correct");
		t.assert(close(doric[23], 1.0101010), "values correct");
		t.assert(close(doric[78], 2.7182818), "values correct");

	});
});

tape("uint8 column has correct type", function(t){
	t.plan(1);

	beam.load(dir, index, function(err, results){

		var tuscan = results.columns["tuscan"];

		t.equal(type(tuscan), "Uint8Array", "type correct");
	});
});

tape("uint8 column has correct values", function(t){
	t.plan(3);

	beam.load(dir, index, function(err, results){

		var tuscan = results.columns["tuscan"];

		t.equal(tuscan[0], 7, "values correct");
		t.equal(tuscan[13], 37, "values correct");
		t.equal(tuscan[34], 89, "values correct");

	});
});

tape("keys have correct values", function(t){
	t.plan(4);

	beam.load(dir, index, function(err, results){

		var ionic_k = results.keys["ionic"];
		t.equal(ionic_k[0], "volute", "key values correct");
		t.equal(ionic_k[1], "abacus", "key values correct");
		t.equal(ionic_k[2], "shaft", "key values correct");
		t.equal(ionic_k[3], "base", "key values correct");
	});
});

var http_index = {
	"doric" : "doric",
	"tuscan" : "tuscan",
	"ionic" : "ionic",
	"corinthian" : "corinthian"
};

var url = "http://localhost:8080/data/";

tape("http float32 column has correct values", function(t){
	t.plan(3);

	beam.load(url, http_index, function(err, results){

		if(err){
			t.fail(err.message);
			return;
		}

		var doric = results.columns["doric"];

		t.assert(close(doric[0], 3.14159), "values correct");
		t.assert(close(doric[23], 1.0101010), "values correct");
		t.assert(close(doric[78], 2.7182818), "values correct");

	});
});

tape("http keys have correct values", function(t){
	t.plan(4);

	beam.load(url, http_index, function(err, results){

		if(err){
			t.fail(err.message);
			return;
		}

		var ionic_k = results.keys["ionic"];
		t.equal(ionic_k[0], "volute", "key values correct");
		t.equal(ionic_k[1], "abacus", "key values correct");
		t.equal(ionic_k[2], "shaft", "key values correct");
		t.equal(ionic_k[3], "base", "key values correct");
	});
});
