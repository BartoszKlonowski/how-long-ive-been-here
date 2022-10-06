import browser, { windows } from "webextension-polyfill";
import {getActiveTabDomainFromURL} from "../popup/Utils";
import {storeTimeSpentSummary} from "../popup/Utils";
import Database from "./Database";

browser.tabs.onActivated.addListener((activeInfo) => {
    const db = new Database();
    browser.tabs.get(activeInfo.tabId).then((tab) => {
        storeTimeSpentSummary(getActiveTabDomainFromURL(tab?.url || "") || "");
    });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const db = new Database();
    if (changeInfo.status == "complete") {
        storeTimeSpentSummary(getActiveTabDomainFromURL(tab.url || "") || "");
    }
});

window.addEventListener("focus", (ev) => {
    console.log("Focus event: ", ev);
});

browser.windows.onFocusChanged.addListener((id) => {
    if(id === windows.WINDOW_ID_NONE) {
        const db = new Database();
        db.writePreviousDomain("no previous domain");
    }
});
