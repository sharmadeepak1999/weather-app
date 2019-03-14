const weatherForm = document.querySelector(".weather-form");
const search = document.querySelector(".search-location");
const errorMessage = document.querySelector("#error-message");
const weatherMessage = document.querySelector("#weather-message");
const loadingMessage = document.querySelector("#loading-message");
const locationMessage = document.querySelector("#location-message");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	loadingMessage.textContent = "Loading..please wait";

	fetch("/weather?address=" + search.value).then((response) => {
		response.json().then((data) => {
			if(data.error){
				loadingMessage.textContent = "";
				weatherMessage.textContent = "";
				locationMessage.textContent = "";
				errorMessage.textContent = data.error;
			}else {
				errorMessage.textContent = "";
				loadingMessage.textContent = "";
				locationMessage.textContent = data.location;
				weatherMessage.textContent = data.message;
			}
		})
	})
})