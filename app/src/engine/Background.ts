import browser from "webextension-polyfill";
import { getActiveTabDomainFromURL } from "../popup/Utils";
import Database from "./Database";

function timeSpentSummary(currentDomain: string) {
    if(currentDomain.length > 0) {
        const db = new Database();
        const lastDomain = db.readPreviousDomain();
        db.writePreviousDomain(currentDomain);
        const lastActive = db.readLastActive(lastDomain);
        const timeSpent = Math.abs(Date.now() - lastActive.getTime());
        let totalTimeSpentOfLastActive = db.readTimeSpent(lastDomain) as number;
        totalTimeSpentOfLastActive += timeSpent;
        db.writeLastActive(currentDomain, new Date());
        db.writeTimeSpent(lastDomain, totalTimeSpentOfLastActive);
    }
}

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.tabs.get(activeInfo.tabId).then((tab) => {
        timeSpentSummary(getActiveTabDomainFromURL(tab?.url || "") || "");
    })
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        timeSpentSummary(getActiveTabDomainFromURL(tab.url || "") || "");
    }
});
