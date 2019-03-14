const express = require("express")
const path = require("path")
const hbs = require("hbs");
const geocode = require("../utils/geocode.js")
const forecast = require("../utils/forecast.js")

const app = express()
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(publicDirectoryPath))
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.get("/", (req, res) => {
	res.render("index", {
		title: "Home",
		name: "Deepak Sharma"
	})
})


app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Deepak Sharma"
	})
})

app.get("/about", (req, res) => {
	res.render("help", {
		title: "About",
		name: "Deepak Sharma"
	})
})

app.get("/weather", (req, res) => {
	if(!req.query.address){
		return res.send({
			error: "Address must be provided for getting weather!"
		})
	}
	const address = req.query.address;
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if(error){
			return res.send({
				error
			})
		}
		console.log(error);
		forecast(latitude, longitude, (error, { summary, temperature, rainProbability } = {}) => {
			if(error){
				return res.send({
					error
				})
			}
			res.send({
				location,
				message: `${summary} The temperature is ${temperature} degrees celcius and there is ${rainProbability}% chances of rain.`
			})
		})
	})
})

app.get("/help/*", (req, res) => {
	res.render("404.hbs", {
		title: "404",
		name: "Deepak Sharma",
		error: "Help article not found."
	})
})

app.get("*", (req, res) => {
	res.render("404.hbs", {
		title: "404",
		name: "Deepak Sharma",
		error: "Page not found."
	})
})

app.listen(port, () => {
	console.log("Server started at pot 3000")
})