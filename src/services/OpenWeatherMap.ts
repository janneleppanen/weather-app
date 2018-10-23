const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const FORECAST_BASE_URL = `//api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&`;
const FIND_BASE_URL = `//api.openweathermap.org/data/2.5/find?appid=${API_KEY}&`;

export const getForecast = async (location: string) => {
  const res = await fetch(`${FORECAST_BASE_URL}q=${location}&mode=json`);
  const json = await res.json();
  return json;
};

export const getForecastByCoords = async (
  latitude: number,
  longitude: number
) => {
  const res = await fetch(
    `${FIND_BASE_URL}lat=${latitude}&lon=${longitude}&cnt=10`
  );
  const json = await res.json();
  return json;
};

export default {
  getForecast
};
