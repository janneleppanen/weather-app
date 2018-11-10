interface GlobalState {
  forecast: ForecastState;
  bookmarks: BookmarkState;
  settings: SettingsState;
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
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  clouds: {
    all: 92;
  };
  weather: Array<{
    description: string;
  }>;
}

interface ForecastState {
  loading: boolean;
  weather: Array<Weather>;
}

type Bookmark = string;
type BookmarkState = Array<Bookmarks>;

type TemperatureScaleSetting = import("../config/constants").TemperatureScales;
type LanguageSetting = import("../config/constants").Languages;
type ThemeSetting = import("../config/constants").Themes;

interface SettingsState {
  temperatureScale: TemperatureScaleSetting;
  language: LanguageSetting;
  theme: ThemeSetting;
}

type FormInputEventWithChecked = React.FormEvent<HTMLInputElement> & {
  target: { checked: boolean };
};

interface Action {
  type: string;
  payload: unknown;
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
