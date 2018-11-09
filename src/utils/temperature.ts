import { TemperatureScales } from "../config/constants";

export const kelvinToCelcius = (kelvin: number) => {
  return kelvin - 273.15;
};

export const displayCelciusFromKelvin = (kelvin: number) => {
  return kelvinToCelcius(kelvin).toFixed(0) + "°C";
};

export const kelvinToFahrenheit = (kelvin: number) => {
  return kelvin * (9 / 5) - 459.67;
};

export const displayFahrenheitFromKelvin = (kelvin: number) => {
  return kelvinToFahrenheit(kelvin).toFixed(0) + "°F";
};

export const displayTemperature = (
  kelvin: number,
  temperatureScale: TemperatureScaleSetting
) => {
  const temperatureConvertMap = {
    [TemperatureScales.fahrenheit]: displayFahrenheitFromKelvin,
    [TemperatureScales.celcius]: displayCelciusFromKelvin
  };
  return temperatureConvertMap[temperatureScale](kelvin);
};

export const getConvertedTemperature = (
  kelvin: number,
  temperatureScale: TemperatureScaleSetting
) => {
  const temperatureConvertMap = {
    [TemperatureScales.fahrenheit]: kelvinToFahrenheit,
    [TemperatureScales.celcius]: kelvinToCelcius
  };
  return temperatureConvertMap[temperatureScale](kelvin);
};
