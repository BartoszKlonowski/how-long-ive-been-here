import browser from "webextension-polyfill";
import {calculateTimeSpentForDomain, getActiveTabDomainFromURL} from "../popup/Utils";
import {storeTimeSpentSummary} from "../popup/Utils";
import Database from "./Database";

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

browser.windows.onFocusChanged.addListener((id) => {
    const windowInactiveID = -1;
    const db = new Database();
    if (id === windowInactiveID) {
        calculateTimeSpentForDomain(db.readPreviousDomain());
        db.writePreviousDomain("");
    } else {
        browser.tabs.query({active: true}).then((tab) => {
            const newFocusedDomain = getActiveTabDomainFromURL(tab[0].url || "");
            db.writeLastActive(newFocusedDomain || "", new Date());
            db.writePreviousDomain(newFocusedDomain || "");
        });
    }
});
