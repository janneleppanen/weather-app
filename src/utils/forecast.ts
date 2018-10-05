import { format } from "date-fns";

export const groupForecastsByDays = (forecasts: Array<Forecast>) => {
  return forecasts.reduce((group, forecast): any => {
    const groupName = format(forecast.dt * 1000, "MM-DD-YYYY");
    if (!group.hasOwnProperty(groupName)) group[groupName] = [];
    group[groupName].push(forecast);
    return group;
  }, {});
};

export const getForecastMinAverage = (forecasts: Array<Forecast>): number => {
  const count = forecasts.length;
  const sum = forecasts.reduce(
    (sum, forecast) => sum + forecast.main.temp_min,
    0
  );
  return Math.round(sum / count);
};

export const getForecastMaxAverage = (forecasts: Array<Forecast>) => {
  const count = forecasts.length;
  const sum = forecasts.reduce(
    (sum, forecast) => sum + forecast.main.temp_max,
    0
  );
  return Math.round(sum / count);
};

export const getForecastAverage = (forecasts: Array<Forecast>) => {
  const count = forecasts.length;
  const sum = forecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0);
  return Math.round(sum / count);
};

export const getForecastMin = (forecasts: Array<Forecast>) => {
  return forecasts.reduce((min, forecast: Forecast): number => {
    return forecast.main.temp_min < min ? forecast.main.temp_min : min;
  }, forecasts[0].main.temp_min);
};

export const getForecastMax = (forecasts: Array<Forecast>) => {
  return forecasts.reduce((max, forecast: Forecast): number => {
    return forecast.main.temp_max > max ? forecast.main.temp_min : max;
  }, forecasts[0].main.temp_max);
};
