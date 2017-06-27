# beam
Download [collimate](https://github.com/dataship/collimate)'d files for use in a [Frame](https://github.com/dataship/frame).


## usage
First, create a data set with [collimate](https://github.com/dataship/collimate).


```javascript
var beam = require('beam'),
	Frame = require('frame');

beam.read("path/to/data/set/", function(err, data){

	var columns = data.columns;
	var keys = data.keys;

	var frame = new Frame(columns, keys);
});
```
