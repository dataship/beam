var fs = require('fs'),
	express = require('express');

var PORT = 8080;
var app = express();

// allow cross origin
app.all('*', function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	/* Headers exposed via CORS are limited. Allowing more requires the following
	 https://stackoverflow.com/questions/14686769/xmlhttp-getresponseheader-not-working-for-cors
	 */
	//res.set("Access-Control-Expose-Headers", "Content-Type, Date");
	next();
});

/*
	"doric" : "doric.f32",
	"tuscan" : "tuscan.u8",
	"ionic" : "ionic.k8",
	"corinthian" : "corinthian.k16"
*/

var dir = "./data/0001/";

app.get('/data/doric', function(req, res){
	res.set("Content-Type", "application/x-float32");

	fs.readFile(dir + "doric.f32", function(err, file){
		if(err){
			var message = err.stack || err.message || "an error occured reading the file.";
			console.error(message);
			return res.status(500).end(message);
		}

		res.end(file);
	});
});

app.get('/data/tuscan', function(req, res){
	res.set("Content-Type", "application/x-uint8");

	fs.readFile(dir + "tuscan.u8", function(err, file){
		if(err){
			var message = err.stack || err.message || "an error occured reading the file.";
			console.error(message);
			return res.status(500).end(message);
		}

		res.end(file);
	});
});

app.get('/data/ionic', function(req, res){
	res.set("Content-Type", "application/x-uint8-k");

	fs.readFile(dir + "ionic.k8", function(err, file){
		if(err){
			var message = err.stack || err.message || "an error occured reading the file.";
			console.error(message);
			return res.status(500).end(message);
		}

		res.end(file);
	});
});

app.get('/data/ionic/key', function(req, res){
	res.set("Content-Type", "application/json");

	fs.readFile(dir + "ionic.k8.key", function(err, file){
		if(err){
			var message = err.stack || err.message || "an error occured reading the file.";
			console.error(message);
			return res.status(500).end(message);
		}

		res.end(file);
	});
});

app.get('/data/corinthian', function(req, res){
	res.set("Content-Type", "application/x-uint16-k");

	fs.readFile(dir + "corinthian.k16", function(err, file){
		if(err){
			var message = err.stack || err.message || "an error occured reading the file.";
			console.error(message);
			return res.status(500).end(message);
		}

		res.end(file);
	});
});

app.get('/data/corinthian/key', function(req, res){
	res.set("Content-Type", "application/json");

	fs.readFile(dir + "corinthian.k16.key", function(err, file){
		if(err){
			var message = err.stack || err.message || "an error occured reading the file.";
			console.error(message);
			return res.status(500).end(message);
		}

		res.end(file);
	});
});

console.log("starting test data server: " + PORT);
app.listen(PORT);
