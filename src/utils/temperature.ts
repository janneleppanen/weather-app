export const kelvinToCelcius = (kelvin: number) => {
  return kelvin - 273.15;
};

export const displayCelciusFromKelvin = (kelvin: number) => {
  return kelvinToCelcius(kelvin).toFixed(0) + " °C";
};
