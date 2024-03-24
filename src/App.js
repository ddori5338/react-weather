import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherBox from "./component/WeatherBox.js";
import WeatherButton from "./component/WeatherButton.js";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 날씨가 나온다.
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.

function App() {
  const cities = ['Paris', 'New York', 'Tokyo', 'Seoul'];

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnActive, setBtnActive] = useState('');

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=925f69a424e2fad2d0429ea3b7e9dd60&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setWeather(err.message);
      setLoading(false);
    }
  }

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=925f69a424e2fad2d0429ea3b7e9dd60&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setWeather(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity} getCurLoc={getCurrentLocation} btnActive={btnActive} setBtnActive={setBtnActive}/>
        </div>
      )}
    </div>
  );
}

export default App;
