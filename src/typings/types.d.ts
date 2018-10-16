declare interface GlobalState {
  forecast: Forecasts;
  bookmarks: Bookmarks;
  settings: Settings;
}

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
  weather: any;
}

interface Forecasts {
  loading: boolean;
  weather: any;
}

type Bookmarks = Array<string>;

type TemperatureSetting = "celcius" | "farenheit";
type LanguageSetting = "en" | "fi";
type ThemeSetting = "light" | "dark";

interface Settings {
  temperature: TemperatureSetting;
  language: LanguageSetting;
  theme: ThemeSetting;
}
