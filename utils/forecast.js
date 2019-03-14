const request = require("request");

const forecast = (latitude, longitude, callback) => {
	let url = `https://api.darksky.net/forecast/3ffc18592832d271a74ffcf930825079/${latitude},${longitude}?units=si`;

	request({ url, json: true}, (err, { body }) => {
		if(err){
			callback("Unable to connect to weather service!");
		} else if(body.error){
			callback("Unable to find weather of given location.");
		} else {
			callback(undefined, {
				temperature: body.currently.temperature,
				rainProbability: body.currently.precipProbability,
				summary: body.daily.data[0].summary
			});
		}
	})
}

module.exports = forecast;
