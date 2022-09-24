if (!global.chrome) global.chrome = {};
if (!global.chrome.runtime) global.chrome.runtime = {};
if (!global.chrome.runtime.id) global.chrome.runtime.id = "testid";
if (!global.browser) global.browser = {tabs: {}};
if (!global.browser.i18n) global.browser.i18n = {};

class LocalStorageMock {
    getItem(key) {
        const store = new Map([
            [
                "lastActive",
                `[
                    ["w3schools.com","2022-09-22T21:05:22.663Z"],
                    ["ackoverflow.com","2022-09-22T21:15:47.647Z"],
                    ["github.com","2022-09-22T21:18:06.550Z"],
                    ["google.com","2022-09-22T21:17:55.602Z"],
                    ["npmjs.com","2022-09-22T21:17:59.983Z"]
                ]`,
            ],
            [
                "timeSpent",
                `[
                    ["w3schools.com",73],
                    ["ackoverflow.com",674],
                    ["github.com",607],
                    ["google.com",7],
                    ["npmjs.com",5]
                ]`,
            ],
        ]);
        const value = store.get(key);
        return value;
    }
}

if (typeof global._localStorage !== "undefined") {
    Object.defineProperty(global, "_localStorage", {
        value: new LocalStorageMock(),
        writable: true,
    });
} else {
    //@ts-ignore
    global.localStorage = new LocalStorageMock();
}

test("Browser is defined correctly for web extension testing", () => {
    expect(global.chrome.runtime.id).toBe("testid");
});
