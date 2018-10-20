import { createActions } from "redux-actions";

import { handleActions } from "../utils/redux-helpers";
import { Temperatures, Languages, Themes } from "../config/constants";
import i18n from "../config/i18n";

export const SET_TEMPERATURE = "SET_TEMPERATURE";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_THEME = "SET_THEME";

type State = Settings;

export const STATE = {
  temperature: Object.keys(Temperatures)[0],
  language: Object.keys(Languages)[0],
  theme: Object.keys(Themes)[0]
};

export const { setTemperature, setLanguage, setTheme } = createActions({
  [SET_TEMPERATURE]: (payload: TemperatureSetting) => payload,
  [SET_LANGUAGE]: (payload: LanguageSetting) => payload,
  [SET_THEME]: (payload: ThemeSetting) => payload
});

const reducer = handleActions(
  {
    [SET_TEMPERATURE]: (state: State, payload) => {
      state.temperature = payload;
    },
    [SET_LANGUAGE]: (state: State, payload) => {
      state.language = payload;
      i18n.changeLanguage(payload);
    },
    [SET_THEME]: (state: State, payload) => {
      state.theme = payload;
    }
  },
  STATE
);

export default reducer;
