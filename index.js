// Your code here
var weather = document.getElementById('weather');
var form = document.querySelector('form');
var URL = 'https://api.openweathermap.org/data/2.5/weather?q='
var KEY = '&units=imperial&appid=185c93b9a43a0081bf87be993043cfb4'

form.onsubmit = function(e) {
    e.preventDefault()
    var searchQuery = this.search.value
    if (!searchQuery) return
    form.search.value = ""
    fetch(URL + KEY + searchQuery)    
    .then(function(res) {
        return res.json()
    })
    .then(getWeather)    
   
    .catch(() => {
        var notFound = document.createElement('p')
        notFound.textContent = 'Location not found!'
        weather.appendChild(notFound)
    })
} 


function getWeather(data){
    weather.innerHTML = ""
    console.log(data)

var city = document.createElement('h2')
city.textContent = data.name + ', ' + data.sys.country
weather.appendChild(city)

// Link to location
    var mapLink = document.createElement('a')
    var latitude = data.coord.lat
    var longitude = data.coord.lon
    mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude
    mapLink.target = '_blank'
    mapLink.textContent = 'click to view map'
    weather.appendChild(mapLink)

// Icon of weather condition
    var img = document.createElement('img')
    img.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    weather.appendChild(img) 

// Description of weather condition
    var currentConditions = document.createElement('p')
    currentConditions.style.textTransform = 'capitalize'
    currentConditions.textContent = data.weather[0].description
    weather.appendChild(currentConditions)

// Actual temperature
    var currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current: ' + data.main.temp + ' °F'
    weather.appendChild(currentTemp)

// Percieved temperature
    var feelsLike = document.createElement('p')
    feelsLike.textContent = 'Feels Like: ' + data.main.feels_like + ' °F'
    weather.appendChild(feelsLike)

// Updated time
    var ms = data.dt * 1000
    var date = new Date(ms)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    var lastUpdated = document.createElement('p')
    lastUpdated.textContent = 'Last Updated: ' + timeString
    weather.appendChild(lastUpdated)
}