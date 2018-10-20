import i18next from "i18next";
import XHR from "i18next-xhr-backend";

const i18n = i18next.use(XHR).init({
  fallbackLng: "en",
  debug: false,
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json"
  },
  react: {
    wait: true
  }
});

export default i18n;
