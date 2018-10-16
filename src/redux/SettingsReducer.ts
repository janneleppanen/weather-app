import { createActions, handleActions } from "redux-actions";

import { Temperatures, Languages, Themes } from "../config/constants";

export const SET_TEMPERATURE = "SET_TEMPERATURE";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_THEME = "SET_THEME";

type State = Settings;

const STATE = {
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
    [SET_TEMPERATURE]: (state: State, { payload }) => {
      return { ...state, temperature: payload };
    },
    [SET_LANGUAGE]: (state: State, { payload }) => {
      return { ...state, language: payload };
    },
    [SET_THEME]: (state: State, { payload }) => {
      return { ...state, theme: payload };
    }
  },
  STATE
);

export default reducer;
