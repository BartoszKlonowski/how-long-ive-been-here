import browser from "webextension-polyfill";
import {getActiveTabDomainFromURL} from "../popup/Utils";
import {storeTimeSpentSummary} from "../popup/Utils";

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.tabs.get(activeInfo.tabId).then((tab) => {
        storeTimeSpentSummary(getActiveTabDomainFromURL(tab?.url || "") || "");
    });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        storeTimeSpentSummary(getActiveTabDomainFromURL(tab.url || "") || "");
    }
});
