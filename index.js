import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.apikey
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?'
let temp = document.getElementById('temp')
let humidity = document.getElementById('humidity')
let place = document.getElementById('location')
let wind = document.getElementById('wind')
let inputField = document.getElementById('input')
let search = document.getElementById('search-icon')
let weatherImage = document.getElementById('weather-image')
let errorMessage = document.getElementById('error')
let weatherInfo = document.getElementById('weather-Info')

async function checkweather(city) {
  const response = await fetch(
    apiUrl + `q=${city}` + '&units=metric' + `&appid=${apiKey}`
  )
  var data = await response.json()
  if (response.status == 404) {
    errorMessage.style.display = 'block'
    weatherInfo.style.display = 'none'
  } else {
    errorMessage.style.display = 'none'
    weatherInfo.style.display = 'flex'
    temp.innerHTML = Math.round(data.main.temp) + '°C'
    humidity.innerHTML = data.main.humidity + '%'
    place.innerHTML = data.name
    wind.innerHTML = data.wind.speed + 'Km/hr'
    if (data.weather[0].main == 'Rain') {
      weatherImage.src = './Weather app images/rain.png'
      weatherImage.alt = 'rain'
    } else if (data.weather[0].main == 'Clouds') {
      weatherImage.src = './Weather app images/clouds.png'
      weatherImage.alt = 'clouds'
    } else if (data.weather[0].main == 'Drizzle') {
      weatherImage.src = './Weather app images/drizzle.png'
      weatherImage.alt = 'drizzzle'
    } else if (data.weather[0].main == 'Mist') {
      weatherImage.src = './Weather app images/mist.png'
      weatherImage.alt = 'mist'
    } else if (data.weather[0].main == 'Clear') {
      weatherImage.src = './Weather app images/clear.png'
      weatherImage.alt = 'clear'
    } else if (data.weather[0].main == 'Snow') {
      weatherImage.src = './Weather app images/snow.png'
      weatherImage.alt = 'snow'
    }
    console.log(data)
  }
}

search.addEventListener('click', () => {
  checkweather(inputField.value)
})
