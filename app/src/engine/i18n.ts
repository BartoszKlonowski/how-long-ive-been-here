import Browser from "webextension-polyfill";

export enum SupportedLanguages {
    EN = "en",
    PL = "pl",
    FR = "fr",
    DE = "de",
    ES = "es",
}

export function getSupportedBrowserLanguage() {
    const browserLanguage = Browser.i18n.getUILanguage().toLowerCase();
    for (const supported in SupportedLanguages) {
        if (supported.toLowerCase() === browserLanguage) {
            return browserLanguage as SupportedLanguages;
        }
    }
    return SupportedLanguages.EN;
}

export function getLanguageSource(language: SupportedLanguages = SupportedLanguages.EN) {
    return require(`./translations/${language}.json`);
}

export function translate(label: string) {
    return getLanguageSource(getSupportedBrowserLanguage())[label];
}
