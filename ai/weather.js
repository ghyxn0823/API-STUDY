const OPENWEATHERMAP_API_KEY = "38af3585c465b94521987445de931164";

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const descriptionElement = document.querySelector(".description");
const weatherIconElement = document.querySelector(".weather-icon");
const feelsLikeElement = document.querySelector(".feels-like");
const humidityElement = document.querySelector(".humidity");
const windSpeedElement = document.querySelector(".wind-speed");

const backgroundMap = {
    'Clear': 'https://images.unsplash.com/photo-1558414849-063a8a049f50',
    'Clouds': 'https://images.unsplash.com/photo-1506525143310-72f53703d151',
    'Rain': 'https://images.unsplash.com/photo-1534088568597-7201e7428867',
    'Drizzle': 'https://images.unsplash.com/photo-1549646875-0d297a7a24c2',
    'Thunderstorm': 'https://images.unsplash.com/photo-1598463943485-a7b534d08b34',
    'Snow': 'https://images.unsplash.com/photo-1517204481232-a5e2f9d5a6b0',
    'Mist': 'https://images.unsplash.com/photo-1582236319803-010464670c2d',
    'Fog': 'https://images.unsplash.com/photo-1582236319803-010464670c2d',
    'Haze': 'https://images.unsplash.com/photo-1582236319803-010464670c2d'
};

async function getWeather(cityName) {
    if (!cityName) {
        alert("도시 이름을 입력해주세요.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=kr`;
    
    cityElement.innerText = "로딩 중...";
    tempElement.innerText = "";
    descriptionElement.innerText = "";
    weatherIconElement.src = "";
    feelsLikeElement.innerText = "";
    humidityElement.innerText = "";
    windSpeedElement.innerText = "";

    try {
        const weatherResponse = await fetch(url);
        if (!weatherResponse.ok) {
            throw new Error('OpenWeatherMap API 요청 실패');
        }
        const weatherData = await weatherResponse.json();
        
        const city = weatherData.name;
        const temp = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const mainWeather = weatherData.weather[0].main;
        const iconCode = weatherData.weather[0].icon;
        const feelsLike = Math.round(weatherData.main.feels_like);
        const humidity = weatherData.main.humidity;
        const windSpeed = Math.round(weatherData.wind.speed * 10) / 10;
        
        cityElement.innerText = city;
        tempElement.innerText = `${temp}°C`;
        descriptionElement.innerText = description;
        feelsLikeElement.innerText = feelsLike;
        humidityElement.innerText = humidity;
        windSpeedElement.innerText = windSpeed;

        weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        const bgImage = backgroundMap[mainWeather] || 'https://images.unsplash.com/photo-1542036735-231a4df021b0';
        document.body.style.backgroundImage = `url('${bgImage}')`;

    } catch (error) {
        console.error('오류 발생:', error);
        cityElement.innerText = "정보를 불러올 수 없습니다.";
        tempElement.innerText = "";
        descriptionElement.innerText = "";
        weatherIconElement.src = "";
        feelsLikeElement.innerText = "";
        humidityElement.innerText = "";
        windSpeedElement.innerText = "";
        document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1542036735-231a4df021b0")';
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value.trim());
});

getWeather("Seoul");