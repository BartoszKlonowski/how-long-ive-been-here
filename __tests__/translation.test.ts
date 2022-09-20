import {getBrowserLanguage, getLanguageSource, SupportedLanguages} from "../app/src/engine/i18n";

describe("i18n", () => {
    it("returns the correct language according to browser settings", () => {
        global.browser.i18n.getUILanguage = () => "EN";
        expect(getBrowserLanguage()).toBe(SupportedLanguages.EN);
        global.browser.i18n.getUILanguage = () => "PL";
        expect(getBrowserLanguage()).toBe(SupportedLanguages.PL);
    });

    it("uses English language as the default one", () => {
        global.browser.i18n.getUILanguage = () => "Fake test non-existing language";
        expect(getBrowserLanguage()).toBe(SupportedLanguages.EN);
    });

    it("has all sources matching regarding keys", () => {
        const defaultLanguage = getLanguageSource();
        for (const language in SupportedLanguages) {
            expect(Object.keys(defaultLanguage)).toStrictEqual(
                Object.keys(getLanguageSource(language as SupportedLanguages))
            );
        }
    });
});
