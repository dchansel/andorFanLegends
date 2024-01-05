import { createI18n } from "vue-i18n";
//import {reactive} from 'vue';
//import {useSettingsStore} from './../stores/settings.js';

import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";

const availableLocalesList = ['de', 'en', 'fr'];
const messages = {
    "de": de,
    "en": en,
    "fr": fr
};

//const store = useSettingsStore();
//let languageSettings = reactive(store.activeLanguage);
    //console.log(language)

const i18n = createI18n({
    locale: getUserLocal(), // <--- 1
    fallbackLocale: "en", // <--- 2
    legacy: false, // <--- 3
    globalInjection: true,
    messages
})

export default i18n

function getUserLocal() {
    //console.log("ENVIRONNEMENT" + process.env.VUE_APP_TITLE)
    //return 'de';
    
    /* eslint-disable */
/*    if( languageSettings != null ) {
        return languageSettings;
    } else*/
    if (availableLocalesList.includes(navigator.language)) {
        //languageSettings = window.navigator.language; 
        return navigator.language;
        //return window.navigator.language;
    } else {
        return 'en';
    }
}