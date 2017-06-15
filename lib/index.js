var beam = require('./beam');


exports.load = beam.load;
exports.read = beam.read;

var path = require('path'),
	fs = require('fs'); // node (server) only

// build an index from a directory listing
// node (server) only
exports.discover = function discover(dir){
	//var dir = path.dirname(pname) + "/";
	if(!dir.endsWith("/")) dir += "/";

	// list all files
	// each distinct basename is a column
	// extensions starting with "s" denote an encoded column
	// and should be accompanied by a key file
	var contents = fs.readdirSync(dir);

	var index = {};
	// build index
	for(var i = 0; i < contents.length; i++){
		file = contents[i];
		ext = path.extname(file);
		base = path.basename(file, ext);
		if(ext == ".key" || fs.statSync(dir + file).isDirectory()) continue;

		index[base] = file;
	}

	return index;
}
