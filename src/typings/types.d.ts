interface City {
  name: string;
}

interface Weather {
  city?: City;
}

interface Forecast {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
}
