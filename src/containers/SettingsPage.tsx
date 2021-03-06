import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";
import { withNamespaces } from "react-i18next";
import { Helmet } from "react-helmet";

import { Container, ToggleButton, FormGroup, AppContent } from "../common";
import * as actions from "../redux/SettingsReducer";
import {
  TemperatureScales,
  Languages,
  Themes,
  AppName
} from "../config/constants";
import SubHeader from "../components/SubHeader";

interface Props {
  temperatureScale: TemperatureScaleSetting;
  language: LanguageSetting;
  theme: ThemeSetting;
  setTemperatureScale: (temperature: TemperatureScaleSetting) => void;
  setLanguage: (language: LanguageSetting) => void;
  setTheme: (theme: ThemeSetting) => void;
  t: i18nT;
}

class SettingsPage extends React.Component<Props, {}> {
  render() {
    const {
      temperatureScale,
      language,
      theme,
      setTemperatureScale,
      setLanguage,
      setTheme,
      t
    } = this.props;

    return (
      <AppContent>
        <Helmet>
          <title>
            {t("settings.title")} | {AppName}
          </title>
        </Helmet>
        <SubHeader backTo="/locations" title={t("settings.title")} />
        <Container padded>
          <FormGroup>
            <h2>{t("settings.temperature")}</h2>
            {_.map(
              TemperatureScales,
              (item: TemperatureScaleSetting, key: string) => (
                <ToggleButton
                  key={key}
                  checked={item === temperatureScale}
                  onClick={() => setTemperatureScale(item)}
                  label={t(`settings.${key}`)}
                />
              )
            )}
          </FormGroup>

          <FormGroup>
            <h2>{t("settings.language")}</h2>
            {_.map(Languages, (item: LanguageSetting, key: LanguageSetting) => (
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
            {_.map(Themes, (item: ThemeSetting, key: ThemeSetting) => (
              <ToggleButton
                key={key}
                checked={key === theme}
                onClick={() => setTheme(key)}
                label={t(`settings.${key}`)}
              />
            ))}
          </FormGroup>
        </Container>
      </AppContent>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  temperatureScale: state.settings.temperatureScale,
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
