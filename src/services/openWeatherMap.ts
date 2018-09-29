const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const BASE_URL = `//api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&`;

export const getForecast = async (location: string) => {
  const res = await fetch(`${BASE_URL}q=${location}&mode=json`);
  const json = await res.json();
  return json;
};

export default {
  getForecast
};
