import { createI18n } from "vue-i18n";

import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";

//import {useLegendsStore} from './../stores';
//const store = useLegendsStore();

const availableLocalesList = ['de', 'en', 'fr'];
const messages = {
  "de": de,
  "en": en,
  "fr": fr
};

const instance = createI18n({
  locale: getUserLocal(), // <--- 1
  fallbackLocale: "en", // <--- 2
  legacy: false, // <--- 3
  globalInjection: true,
  messages
})
//store.i18n =  getUserLocal()

export default instance
/*createI18n({
  locale: getUserLocal(), // <--- 1
  fallbackLocale: "en", // <--- 2
  legacy: false, // <--- 3
  globalInjection: true,
  messages
})*/ 

function getUserLocal() {
  //console.log("WIN " + window.navigator.language);
  if (availableLocalesList.includes(window.navigator.language)) {
      return window.navigator.language;
  } else {
      return 'en';
  }
}