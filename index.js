var loader = require('arrayloader'); // command-line/browser cross platform file loader

exports.load = load = function load(dir, index, callback){

	var names = Object.keys(index);

	// add key files
	var file, files = [], map = [];
	for(var i = 0; i < names.length; i ++){
		file = index[names[i]];
		files.push(dir + file);
		map.push(names[i]);
		if(file.endsWith(".k8")){
			files.push(dir + file.slice(0, -3) + ".key");
			map.push(names[i]);
		} else if(file.endsWith(".k16")){
			files.push(dir + file.slice(0, -4) + ".key");
			map.push(names[i]);
		}
	}

	var columns = {};
	var keys;
	// load columns
	loader.loadall(files, function(err, results){

		if(err) return callback(err);

		var name, file;
		for(var i = 0; i < files.length; i++){
			name = map[i];
			//console.log(name);
			file = files[i];
			if(file.endsWith(".key")){
				if(keys == null) keys = {};
				keys[name] = results[i];
			} else {
				columns[name] = results[i];
			}
		}

		//console.log(Object.keys(columns));
		if(keys == null) return callback(null, {"columns" : columns});
		else return callback(null, {"columns" : columns, "keys" : keys});
	});
};

/*
 look for index.json
 load the columns described therein
*/
exports.read = function read(dir, callback){
	if(!dir.endsWith("/")) dir += "/";

	var file = "index.json";
	loader.load(dir + file, function(err, index){
		if(err) return callback(err);

		return load(dir, index, callback);
	});
};

// build an index from a directory listing
// from initial version (kept for later reuse)
// node (server) only
/*
var path = require('path'),
	fs = require('fs'), // node (server) only

exports.build_index = function build_index(dir){
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
*/
