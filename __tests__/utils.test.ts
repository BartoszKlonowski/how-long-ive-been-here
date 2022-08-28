import {getActiveTabDomainFromURL, getWebsiteIconObject} from "../app/src/popup/Utils";

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
});

describe("getWebsiteIconObject", () => {
    it("gets the domain of valid active tab website with simplified URL", () => {
        const fakeWebsiteURL = "fake-website-url";
        expect(getWebsiteIconObject(fakeWebsiteURL)).toEqual({
            size: 16,
            src: "http://www.google.com/s2/favicons?domain=fake-website-url",
        });
    });

    it("creates the object with question mark for non-existing URL", () => {
        const fakeWebsiteURL = "";
        expect(getWebsiteIconObject(fakeWebsiteURL)).toEqual({
            size: 16,
            src: "../resources/missing-website-favicon.png",
        });
    });

    it("creates the object with question mark for incorrect URL", () => {
        const incorrectWebsiteURL = undefined;
        expect(getWebsiteIconObject(incorrectWebsiteURL)).toEqual({
            size: 16,
            src: "../resources/missing-website-favicon.png",
        });
    });
});
