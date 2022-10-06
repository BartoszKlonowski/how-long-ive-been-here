import {
    getActiveTabDomainFromURL,
    getWebsiteIconObject,
    howManyHoursInSeconds,
    howManyMinutesInSeconds,
    howManySecondsInSeconds,
} from "../app/src/popup/Utils";

describe("getActiveTabDomainFromURL", () => {
    it("gets the domain of valid active tab website with simplified URL", () => {
        const fakeURL = String("https://fake-website-url.com");
        expect(getActiveTabDomainFromURL(fakeURL)).toBe("fake-website-url.com");
    });

    it("gets the domain of valid active tab website with complex URL", () => {
        const fakeURL = String("https://fake-website-url.com/complex-string-in-url");
        expect(getActiveTabDomainFromURL(fakeURL)).toBe("fake-website-url.com");
    });

    it("returns null to indicate the incorrect website URL if noticed", () => {
        const fakeURL = String("this is incorrect website URL");
        expect(getActiveTabDomainFromURL(fakeURL)).toBe(null);
    });

    it("returns correct domain if URL does not start with https://", () => {
        const fakeURL = String("www.google.com");
        expect(getActiveTabDomainFromURL(fakeURL)).toBe("google.com");
    });

    it("correctly parses domains that contains h, t, p, or s characters at the beginning", () => {
        expect(getActiveTabDomainFromURL("https://stackoverflow.com/questions")).toBe("stackoverflow.com");
        expect(getActiveTabDomainFromURL("http://stackoverflow.com/questions")).toBe("stackoverflow.com");
        expect(getActiveTabDomainFromURL("https://translate.google.pl/?sl=pl&tl=en&op=translate")).toBe(
            "translate.google.pl"
        );
        expect(getActiveTabDomainFromURL("https://www.santander.pl/klient-indywidualny")).toBe("santander.pl");
    });

    it("correctly parses domains that contains w at the beginning", () => {
        expect(getActiveTabDomainFromURL("https://wybory2011.pkw.gov.pl/wsw/pl/000000.html")).toBe(
            "wybory2011.pkw.gov.pl"
        );
        expect(getActiveTabDomainFromURL("https://wiadomosci.onet.pl/inwazja-rosji-na-ukraine")).toBe(
            "wiadomosci.onet.pl"
        );
        expect(getActiveTabDomainFromURL("https://www.wroclaw.pl/dla-mieszkanca/aktualnosci")).toBe("wroclaw.pl");
    });
});

describe("getWebsiteIconObject", () => {
    it("gets the domain of valid active tab website with simplified URL", () => {
        const fakeWebsiteURL = "fake-website-url";
        expect(getWebsiteIconObject(fakeWebsiteURL)).toEqual({
            size: 20,
            src: "https://icons.duckduckgo.com/ip3/fake-website-url.ico",
        });
    });

    it("creates the object with question mark for non-existing URL", () => {
        const fakeWebsiteURL = "";
        expect(getWebsiteIconObject(fakeWebsiteURL)).toEqual({
            size: 20,
            src: "../resources/missing-website-favicon.png",
        });
    });

    it("creates the object with question mark for incorrect URL", () => {
        const incorrectWebsiteURL = undefined;
        expect(getWebsiteIconObject(incorrectWebsiteURL)).toEqual({
            size: 20,
            src: "../resources/missing-website-favicon.png",
        });
    });
});

describe("howManyHoursInSeconds", () => {
    it("calculates hours correctly regardless minutes, seconds", () => {
        const seconds = 568923;
        expect(howManyHoursInSeconds(seconds)).toBe(158);
    });

    it("returns 0 for number of seconds below one hour", () => {
        const seconds = 2100;
        expect(howManyHoursInSeconds(seconds)).toBe(0);
    });
});

describe("howManyMinutesInSeconds", () => {
    it("calculates minutes correctly regardless for seconds", () => {
        const seconds = (10 + 60) * 60;
        expect(howManyMinutesInSeconds(seconds)).toBe(10);
    });

    it("returns 0 for number of seconds below one minute", () => {
        const seconds = 46;
        expect(howManyMinutesInSeconds(seconds)).toBe(0);
    });

    it("returns 28 for number of seconds of 1:28:32", () => {
        const seconds = 32 + 60 * 28 + 3600 * 1; // 1 hour, 28 minutes and 32 seconds
        expect(howManyMinutesInSeconds(seconds)).toBe(28);
    });
});

describe("howManySecondsInSeconds", () => {
    it("calculates seconds correctly", () => {
        const seconds = 70 * 60 + 24; // 70 minutes and 24 seconds
        expect(howManySecondsInSeconds(seconds)).toBe(24);
    });

    it("returns 0 for number of seconds equal to one minute", () => {
        const seconds = 60;
        expect(howManySecondsInSeconds(seconds)).toBe(0);
    });
});
