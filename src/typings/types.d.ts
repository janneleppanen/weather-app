interface GlobalState {
  forecast: Forecasts;
  bookmarks: Bookmarks;
  settings: Settings;
}

interface City {
  name: string;
}

interface Weather {
  city?: City;
  cod: string;
  message: number | string;
  list?: Array<Forecast>;
}

interface Forecast {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface Forecasts {
  loading: boolean;
  weather: Weather;
}

type Bookmarks = Array<string>;

type TemperatureSetting = import("../config/constants").Temperatures;
type LanguageSetting = import("../config/constants").Languages;
type ThemeSetting = import("../config/constants").Themes;

interface Settings {
  temperature: TemperatureSetting;
  language: LanguageSetting;
  theme: ThemeSetting;
}

// i18n
declare type i18nT = (key: string, options?: Object) => string;

// React router
interface RouterProps {
  match: {
    params: {
      location?: string;
      date?: string;
    };
  };
  history: {
    push: Function;
  };
}
