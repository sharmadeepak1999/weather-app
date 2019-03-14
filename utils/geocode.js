const request = require("request");

const geocode = (address, callback) => {

	let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGVlcGFrLXNoYXJtYSIsImEiOiJjanQ1cTk4Z2kwNnNzM3ludnprZWVnaHhsIn0.rnVoPgBtOFPDxocdWgdrPw&limit=1`;
	request({ url, json : true}, (err, { body }) => {
		if(err){
			callback("Unable to connect to location service!");
		} else if(body.message || body.features.length === 0) {
			callback("Unable to find loaction. Try another search.");
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
	
}

module.exports = geocode;