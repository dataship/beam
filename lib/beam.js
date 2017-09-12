
var loader = require('arrayloader'); // command-line/browser cross platform file loader
exports.load = load = function load(dir, index, callback){

	var names = Object.keys(index);

	// create initial file list
	var file, files = [], map = [];
	for(var i = 0; i < names.length; i ++){
		file = index[names[i]];
		files.push(dir + file);
		map.push(names[i]);
	}

	// get types
	loader.typeall(files, function(err, types){
		// look for '-k' suffix and add key files

		var len = files.length;
		for(var i = 0; i < len; i++){
			// is the current type and encoded type?
			if(types[i] == "uint8-k" || types[i] === "uint16-k"){
				files.push(files[i] + ".key");
				map.push(names[i]);
				types.push("json");
			}
		}

		var columns = {};
		var keys;
		// load columns
		loader.loadall(files, types, function(err, results){

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
