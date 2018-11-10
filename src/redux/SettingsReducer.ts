import { createActions } from "redux-actions";

import { handleActions } from "../utils/redux-helpers";
import { TemperatureScales, Languages, Themes } from "../config/constants";

export const SET_TEMPERATURE_SCALE = "SET_TEMPERATURE_SCALE";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_THEME = "SET_THEME";

type State = SettingsState;

export const STATE = {
  temperatureScale: Object.keys(TemperatureScales).map(
    key => TemperatureScales[key]
  )[0],
  language: Object.keys(Languages)[0],
  theme: Object.keys(Themes)[0]
};

export const { setTemperatureScale, setLanguage, setTheme } = createActions({
  [SET_TEMPERATURE_SCALE]: (payload: TemperatureScaleSetting) => payload,
  [SET_LANGUAGE]: (payload: LanguageSetting) => payload,
  [SET_THEME]: (payload: ThemeSetting) => payload
});

const reducer = handleActions(
  {
    [SET_TEMPERATURE_SCALE]: (
      state: State,
      payload: TemperatureScaleSetting
    ) => {
      state.temperatureScale = payload;
    },
    [SET_LANGUAGE]: (state: State, payload: LanguageSetting) => {
      state.language = payload;
    },
    [SET_THEME]: (state: State, payload: ThemeSetting) => {
      state.theme = payload;
    }
  },
  STATE
);

export default reducer;
