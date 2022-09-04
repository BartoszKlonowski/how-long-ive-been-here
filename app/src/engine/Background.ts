import browser from "webextension-polyfill";

browser.tabs.onActivated.addListener((activeInfo) => {
    console.log("browser.tabs.onActivated with activeInfo: ", activeInfo);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("browser.tabs.onUpdated for tabId: ", tabId);
    if (changeInfo.status == "complete") {
        console.log("browser.tabs.onUpdated with tab: ", tab);
    }
});
