import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { Container } from "../common";
import * as actions from "../redux/SettingsReducer";
import { Temperatures, Languages, Themes } from "../config/constants";

interface Props {
  temperature: TemperatureSetting;
  language: LanguageSetting;
  theme: ThemeSetting;
  setTemperature: (TemperatureSetting) => void;
  setLanguage: (LanguageSetting) => void;
  setTheme: (ThemeSetting) => void;
}

class SettingsPage extends React.Component<Props, {}> {
  render() {
    const {
      temperature,
      language,
      theme,
      setTemperature,
      setLanguage,
      setTheme
    } = this.props;
    return (
      <Container>
        <h1>Settings</h1>
        <div>
          <h2>Temeprature</h2>
          {_.map(Temperatures, (item, key) => (
            <label key={key}>
              <input
                type="radio"
                checked={key === temperature}
                onChange={() => setTemperature(key)}
                name="temperature"
                value={key}
              />{" "}
              {item}
            </label>
          ))}
        </div>

        <div>
          <h2>Language</h2>
          {_.map(Languages, (item, key) => (
            <label key={key}>
              <input
                type="radio"
                checked={key === language}
                onChange={() => setLanguage(key)}
                name="language"
                value={key}
              />{" "}
              {item}
            </label>
          ))}
        </div>

        <div>
          <h2>Theme</h2>
          {_.map(Themes, (item, key) => (
            <label key={key}>
              <input
                type="radio"
                checked={key === theme}
                onChange={() => setTheme(key)}
                name="theme"
                value={key}
              />{" "}
              {item}
            </label>
          ))}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  temperature: state.settings.temperature,
  language: state.settings.language,
  theme: state.settings.theme
});

export default connect(
  mapStateToProps,
  actions
)(SettingsPage);
