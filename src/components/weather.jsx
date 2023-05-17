import { useState, useEffect } from "react";
import Autocomplete from "./Autocomplete";
import cities from "../cities-fr.json";

const API_KEY = "9b7e64be31d3f28d05f33185f1f2e49e";

function Weather() {
  const [location, setLocation] = useState({
    id: 3038789,
    nm: "Abbeville",
    lat: 50.099998,
    lon: 1.83333,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading,setIsLoaidng] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaidng(true)
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const forecast = {
        city: data.city,
        list: data.list.slice(0, 3 * 8), // 4 days of data (8 items per day)
      };
      setWeatherData(forecast.list);
      setIsLoaidng(false)
    };

    fetchData();
  }, [location]);

  return (
    <div className="px-6 py-6 text-white">
      <div className="text-xl pb-2 font-semibold">Selectionner votre ville</div>
      <Autocomplete
        data={cities}
        placeholder={"select country"}
        setLocation={setLocation}
      />
      {!isLoading?<div className="pt-6 pb-4 mx-3">
        <div className="py-2 text-lg text-center bg-[#7e56c3] rounded-sm font-semibold">
          {location?.nm}
        </div>
        {weatherData && (
          <>
            <div className="flex relative items-center justify-center flex-col">
              <img
                className="w-[200px] absolute -top-10 h-[200px]"
                src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@4x.png`}
                alt="weather icon"
              />
              <div className="font-bold absolute top-[115px] text-3xl">
                {Math.round(weatherData[0].main.temp - 273.15)}°C
              </div>
            </div>
            <div className="absolute bottom-[15%] 2xl:bottom-[25%]">
              <div className="flex py-2 justify-between text-lg px-6 text-center w-[380px] bg-[#7e56c3] rounded-sm font-semibold">
                <div>
                  {new Date(weatherData[4].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                  )}
                </div>
                <div>
                  {new Date(weatherData[12].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                  )}
                </div>
                <div>
                  {new Date(weatherData[21].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                  )}
                </div>
              </div>
              <div className="flex items-center w-[380px] justify-between px-4 ">
                <div className="flex  text-xl items-center flex-col">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData[4].weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <span>
                    {Math.round(weatherData[4].main.temp_max - 273.15)}°C
                  </span>
                </div>
                <div className="flex  text-xl items-center flex-col">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData[12].weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <span>
                    {Math.round(weatherData[12].main.temp_max - 273.15)}°C
                  </span>
                </div>
                <div className="flex  text-xl items-center flex-col">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData[21].weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <span>
                    {Math.round(weatherData[21].main.temp_max - 273.15)}°C
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>:<>
      <div className="w-[400px] flex items-center justify-center h-[300px]  ">
        <div className="basic"></div>
      </div>
      </>}
    </div>
  );
}

export default Weather;
