if (!global.chrome) global.chrome = {};
if (!global.chrome.runtime) global.chrome.runtime = {};
if (!global.chrome.runtime.id) global.chrome.runtime.id = "testid";
if (!global.browser) global.browser = {tabs: {}};
if (!global.browser.i18n) global.browser.i18n = {};

test("Browser is defined correctly for web extension testing", () => {
    expect(global.chrome.runtime.id).toBe("testid");
});
