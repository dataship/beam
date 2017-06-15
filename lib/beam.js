
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
