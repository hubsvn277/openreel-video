import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

const LANG_KEY = "video-editor-lang";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: localStorage.getItem(LANG_KEY) ?? "vi",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function setLanguage(lang: "en" | "vi") {
  i18n.changeLanguage(lang);
  localStorage.setItem(LANG_KEY, lang);
}

export default i18n;
