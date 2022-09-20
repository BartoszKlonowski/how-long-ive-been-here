import Browser from "webextension-polyfill"

export enum SupportedLanguages {
    EN = "en",
    PL = "pl",
}

export function getBrowserLanguage() {
    const browserLanguage = Browser.i18n.getUILanguage().toLowerCase();
    for(const supported in SupportedLanguages) {
        if(supported.toLowerCase() === browserLanguage) {
        return browserLanguage as SupportedLanguages;}
    }   return SupportedLanguages.EN;
}

export function getLanguageSource(language: SupportedLanguages = SupportedLanguages.EN) {
    return require(`./translations/${language}.json`);
}

export function translate(label: string) {
    let language;
    switch(Browser.i18n.getUILanguage()) {
        case SupportedLanguages.EN:
            language = require("./translations/en.json");
            break;
        case SupportedLanguages.PL:
            language = require("./translations/pl.json");
            break;
        default:
            language = require("./translations/en.json");
            break;
    }

    return language[label];
}
