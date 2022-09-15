import browser from "webextension-polyfill";
import {getActiveTabDomainFromURL} from "../popup/Utils";
import Database from "./Database";

function storeTimeSpentSummary(currentDomain: string) {
    if (currentDomain.length > 0) {
        const db = new Database();

        const previousDomain = db.readPreviousDomain();
        db.writePreviousDomain(currentDomain);
        db.writeLastActive(currentDomain, new Date());

        const lastActive = db.readLastActive(previousDomain);
        const timeSpent = Math.abs(Date.now() - lastActive.getTime());
        const totalTimeSpentOfLastActive = (db.readTimeSpent(previousDomain) as number) + timeSpent;
        db.writeTimeSpent(previousDomain, totalTimeSpentOfLastActive);
    }
}

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
