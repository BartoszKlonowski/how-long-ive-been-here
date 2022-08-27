import {getActiveTabDomainFromDocument, getWebsiteIconObject} from "../app/src/popup/Utils";

describe("getActiveTabDomainFromDocument", () => {
    it("gets the domain of valid active tab website with simplified URL", () => {
        const fakeDocument = {
            URL: String("https://fake-website-url.com"),
            ...document,
        };
        expect(getActiveTabDomainFromDocument(fakeDocument)).toBe("fake-website-url.com");
    });

    it("gets the domain of valid active tab website with complex URL", () => {
        const fakeDocument = {
            URL: "https://fake-website-url.com/complex-string-in-url",
            ...document,
        };
        expect(getActiveTabDomainFromDocument(fakeDocument)).toBe("fake-website-url.com");
    });

    it("returns null to indicate the incorrect website URL if noticed", () => {
        const fakeDocument = {
            URL: "this is incorrect website URL",
            ...document,
        };
        expect(getActiveTabDomainFromDocument(fakeDocument)).toBe(null);
    });

    it("returns correct domain if URL does not start with https://", () => {
        const fakeDocument = {
            URL: "www.google.com",
            ...document,
        };
        expect(getActiveTabDomainFromDocument(fakeDocument)).toBe("google.com");
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

    it("creates the object with question mark for non-existing or incorrect URL", () => {
        const fakeWebsiteURL = "";
        expect(getWebsiteIconObject(fakeWebsiteURL)).toEqual({
            size: 16,
            src: "../resources/missing-website-favicon.png",
        });
    });
});
