import Browser from "webextension-polyfill"

export enum SupportedLanguages {
    EN = "en",
    PL = "pl",
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
