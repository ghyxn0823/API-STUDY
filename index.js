import config from "./config.js";
const { API_KEY } = config;

const CITY_NAME = "Gwangju";

// HTML에 있는 요소들을 자바스크립트로 가져옴
const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temp");
const descriptionElement = document.getElementById("description");

// 날씨 정보를 가져오는 함수를 만듬
function getWeather() {
  // api 주소 및 도시 이름이 들어감
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric&lang=kr`;

  // API에 날씨 정보를 요청
  fetch(url)
    .then((response) => {
      // 요청이 됬는지 확인
      if (!response.ok) {
        // 실패시 에러 메세지
        throw new Error("API 요청 실패");
      }
      // 성공했다면 받은 데이터를 우리가 보기 쉬운 형태로 바꿔줌
      return response.json();
    })
    .then((data) => {
      // 바꾼 데이터에서 필요한 정보만 나타내줌
      const cityName = data.name;
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;

      cityElement.innerText = cityName;
      tempElement.innerText = `${temp}°C`;
      descriptionElement.innerText = description;
    })
    .catch((error) => {
      // 만약 문제가 생겼다면 오류 코드 실행
      console.error("오류 발생:", error);
      cityElement.innerText = "날씨 정보를 불러올 수 없습니다.";
      tempElement.innerText = "";
      descriptionElement.innerText = "";
    });
}

// 웹페이지가 실행되면 날씨 정보를 바로 가져옴
getWeather();
