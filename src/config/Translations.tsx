import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { connect } from "react-redux";

import i18n from "./i18n";

interface Props {
  language: LanguageSetting;
}

class Translations extends React.Component<Props> {
  componentWillMount() {
    i18n.changeLanguage(this.props.language);
  }

  componentDidUpdate(prevProps: Props) {
    const { language } = this.props;
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }

  render() {
    return <I18nextProvider i18n={i18n}>{this.props.children}</I18nextProvider>;
  }
}

const mapStateToProps = ({ settings }: GlobalState) => ({
  language: settings.language
});

export default connect(mapStateToProps)(Translations);
