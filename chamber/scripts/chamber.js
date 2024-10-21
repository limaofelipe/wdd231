const url = './scripts/members.json'

const cards = document.querySelector('#cards-section');

const getMembersData = async () => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const data = await response.json();

        return data
    }

    catch (error) {
        console.error(error.message)
    }
}

const weatherIcon = document.createElement('img');
const weatherDisplay = document.querySelector('.weather-display')
const weatherInfo = document.querySelector('#weather-info');
const forecastInfo = document.querySelector('#forecast-weather-info');
const advertising = document.querySelector('#advertising');

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-3.731862&lon=-38.526669&appid=365bb31e8430fa7107bff14e0635076f&units=metric';

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-3.731862&lon=-38.526669&cnt=24&&appid=365bb31e8430fa7107bff14e0635076f&units=metric';

const fecthingCurrentWeatherData = async () => {
  try {
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
          throw new Error (`Response status: ${weatherResponse.status}`)
      }

      const weatherData = await weatherResponse.json();
      
      return weatherData
  }

  catch (error) {
      console.log(error.message);
  }
}



const fetchingForecastWeather = async () => {
  try {
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
          throw new Error (`Response status: ${forecastResponse.status}`)
      }

      const forecastData = await forecastResponse.json();
      return forecastData
  }

  catch (error) {
      console.log(error.message);
  }
}

const averageForecastTemp = async () => {
  const forecastData = await fetchingForecastWeather();

  const firstDayForecastData = forecastData.list.slice(0, 8);
  let firstDay = 0;
  const firstDayAverageTemp = firstDayForecastData.reduce((total, day) => total + day.main.temp, 0) / firstDayForecastData.length;

  const secondDayForecastData = forecastData.list.slice(8,16)
  let secondDay = 0;
  const secondDayAverageTemp = secondDayForecastData.reduce((total, day) => total + day.main.temp, 0) / secondDayForecastData.length;

  const thirdDayForecastData = forecastData.list.slice(16,24);
  let thirdDay = 0;
  const thirdDayAverageTemp = thirdDayForecastData.reduce((total, day) => total + day.main.temp, 0) / thirdDayForecastData.length;
  
  const firstDayData = {
      "temp": firstDayAverageTemp,
      "date": firstDayForecastData[0].dt_txt
  };

  const secondDayData = {
      "temp": secondDayAverageTemp,
      "date": secondDayForecastData[0].dt_txt
  };
  
  const thirdDayData = {
      "temp": thirdDayAverageTemp,
      "date": thirdDayForecastData[0].dt_txt
  };

  return {
      firstDayData,
      secondDayData,
      thirdDayData
  };
}

async function populatingForecastWeather() {
  const { firstDayData, secondDayData, thirdDayData } = await averageForecastTemp();

  forecastInfo.innerHTML = `
      <li>Tomorrow: <strong>${firstDayData.temp.toFixed(0)}&deg;C</strong></li>
      <li>${new Date(secondDayData.date).toLocaleString('en-US', { weekday: 'long' })}: <strong>${secondDayData.temp.toFixed(0)}&deg;C</strong></li>
      <li>${new Date(thirdDayData.date).toLocaleString('en-US', { weekday: 'long' })}: <strong>${thirdDayData.temp.toFixed(0)}&deg;C</strong></li>
  `;
}

function populatingCurrentWeather (data){
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
  weatherIcon.setAttribute('alt', 'The curretn weather icon');
  weatherIcon.setAttribute('width', 150);
  weatherIcon.setAttribute('height', 150);
  weatherDisplay.appendChild(weatherIcon);

  const sunriseTimestamp = data.sys.sunrise; 
  const sunsetTimestamp = data.sys.sunset;

  const sunriseDate = new Date(sunriseTimestamp * 1000);
  const sunsetDate = new Date(sunsetTimestamp * 1000);

  const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  weatherInfo.innerHTML = `
      <p><strong>${data.main.temp}&deg;</strong> C</p>
      <p>${data.weather[0].description}</p>
      <p>High: ${data.main.temp_max}&deg;</p>
      <p>Low: ${data.main.temp_min}&deg;</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Sunrise: ${sunriseTime}</p>
      <p>Sunset: ${sunsetTime}</p>
  `
}

const displayCurrentWeather = async () => {
  const weatherData = await fecthingCurrentWeatherData();

  populatingCurrentWeather(weatherData);
}

function shuffleCompanies(companies) {
  return companies.sort(() => Math.random() - 0.5);
}


const randomAdvertising = async () => {

  const membersData = await getMembersData();
  const filteredCompanies = await membersData.filter(company => company.level >= 2)
  const randomCompanies = shuffleCompanies(filteredCompanies);
  const selectedCompanies = randomCompanies.slice(0, 3);

  selectedCompanies.forEach(company => {
      advertising.innerHTML += `
      <article class="home-card ads">
        <div class="advertising-card-title">
            <h3>${company.name}</h3>
            <p>${company.address}</p>
        </div>
        
        <div class="advertising-info">
            <img src="${company.image}" alt="The icon of ${company.name}" width="110" height="110">
            <div>
                <p${company.other}</p>
                <p>Phone: ${company.phone}</p>
                <a href="${company.website}">Website</a>
            </div>
        </div>

      </article>
      `
  })
  
 
  console.log(selectedCompanies)
}


randomAdvertising();

document.addEventListener('DOMContentLoaded', ()=> {  
  displayCurrentWeather();
  populatingForecastWeather();
})