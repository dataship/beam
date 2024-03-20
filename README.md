# beam
Download [collimate](https://github.com/dataship/collimate)'d files for use in a [Frame](https://github.com/dataship/frame).


## install

For use from the command-line:

`npm install -g dataship-beam`

For use as a library:

`npm install --no-optional dataship-beam`

This will exclude the argument parsing library for a smaller install.

## usage
First, create a data set with [collimate](https://github.com/dataship/collimate).


```javascript
var beam = require('dataship-beam'),
	Frame = require('dataship-frame');

beam.read("path/to/data/set/", function(err, data){

	var columns = data.columns;
	var keys = data.keys;

	var frame = new Frame(columns, keys);
});
```
