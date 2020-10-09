
let temperatureDiv = document.getElementById("temperatureDiv")
let weatherDataDiv = document.getElementById("weatherDataDiv")
let currentLocationButton = document.getElementById("foo")

currentLocationButton.addEventListener('click',function(){

    // get the current location 
    if(!navigator.geolocation) {
        console.log('Gelocation not supported')
    } else {
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position.coords.latitude)
        })
    }

})


// make a request to get the weather 
let url = "https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=7d2dd8c9c5578b741c7735ad3f0d39ea&units=imperial"

fetch(url).then(response => {
    return response.json() 
}).then(result => {
    //displayWeather(result)
    displayWeather2(result)
})

function displayWeather2(weatherData) {

    let weatherItem = `<div>${weatherData.main.temp}</div>
                        <div>${weatherData.weather[0].description}</div>
                        `   
    weatherDataDiv.innerHTML = weatherItem
}

function displayWeather(weatherData) {
    temperatureDiv.innerHTML = weatherData.main.temp
}

