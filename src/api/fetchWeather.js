import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "8a118d6053918c7d1257424380e4785b";
// 8a118d6053918c7d1257424380e4785b - forecast
// f33a484cf794d08d0148764789aaba32 - weather

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      appid: API_KEY,
    },
  });

  return data;
};
