#!/usr/bin/env node
/* Download collimated data packages.
 */
const fs = require('fs'); // node:fs
const URL = require('url').URL;
const path = require('path');
var loader = require('arrayloader');
var beam = require('./lib/beam.js');

/* exits if there's an error or if object is null
   if object is null the message is shown
   if err is not null that's shown
 */
function handleError(err, obj, message){

	if(!obj){
		console.log(message);
		console.log('\t' + (err.message ? err.message : err));
		process.exit(1);
	} else if(err) {
		console.log(err);
		process.exit(1);
	}
}

if(require.main === module){
	// yes, parse command line args and show something
	var argv = require('yargs')
		.usage('Download collimated data packages\nUsage: $0 [options] <url>')
		.demand(1)
		.boolean('v').describe('v', 'show more info')
		.help('h').alias('h', 'help')
		.argv

	var url = argv._[0];

	// verbose
	if(argv.v){}
	

	var file = "index.json";
	var index_path;
	if(url.endsWith("/")){
		index_path = url + file;
	} else {
		index_path = url +"/"+file;
	} 
	loader.load(index_path, function(err, index){
		
		handleError(err, "Couldn't load index from: " + url);


		return load(url, index, function(err, results){
			
			handleError(err, "Couldn't download data from: " + url);

			/// write columns and index.json to files

			// extract package name from end of url
			const parsed_url = new URL(url);
			var path_part = parsed_url.pathname;
			var parts = path_part.split("/");
			console.log(parts);
			var package_name = parts[parts.length-1];
			if(package_name == "") package_name = parts[parts.length-2];
			var package_dir = "./" + package_name;
			
			try {
				// create directory with package name
				fs.mkdirSync(package_dir);

				// write index.json
				fs.writeFileSync(path.join(package_dir, 'index.json'), JSON.stringify(index, null, 4));

				// iterate columns and write
				for(const [name, filename] of Object.entries(index)){

					fs.writeFileSync(path.join(package_dir, filename), results.columns[name]);
				}
			} catch (err) {
				console.error(err);
			}
		});
	});
}