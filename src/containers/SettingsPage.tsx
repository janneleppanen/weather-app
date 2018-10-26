import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { compose } from "lodash/fp";
import { withNamespaces } from "react-i18next";

import { Container, ToggleButton, FormGroup } from "../common";
import * as actions from "../redux/SettingsReducer";
import { Temperatures, Languages, Themes } from "../config/constants";

interface Props {
  temperature: TemperatureSetting;
  language: LanguageSetting;
  theme: ThemeSetting;
  setTemperature: (TemperatureSetting) => void;
  setLanguage: (LanguageSetting) => void;
  setTheme: (ThemeSetting) => void;
  t: any;
}

class SettingsPage extends React.Component<Props, {}> {
  render() {
    const {
      temperature,
      language,
      theme,
      setTemperature,
      setLanguage,
      setTheme,
      t
    } = this.props;

    return (
      <Container>
        <h1>{t("settings.title")}</h1>
        <FormGroup>
          <h2>{t("settings.temperature")}</h2>
          {_.map(Temperatures, (item, key) => (
            <ToggleButton
              key={key}
              checked={item === temperature}
              onClick={() => setTemperature(item)}
              label={t(`settings.${key}`)}
            />
          ))}
        </FormGroup>

        <FormGroup>
          <h2>{t("settings.language")}</h2>
          {_.map(Languages, (item, key) => (
            <ToggleButton
              key={key}
              checked={item === language}
              onClick={() => setLanguage(key)}
              label={t(`settings.${key}`)}
            />
          ))}
        </FormGroup>

        <FormGroup>
          <h2>{t("settings.theme")}</h2>
          {_.map(Themes, (item, key) => (
            <ToggleButton
              key={key}
              checked={key === theme}
              onClick={() => setTheme(key)}
              label={t(`settings.${key}`)}
            />
          ))}
        </FormGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  temperature: state.settings.temperature,
  language: state.settings.language,
  theme: state.settings.theme
});

export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    actions
  )
)(SettingsPage);
