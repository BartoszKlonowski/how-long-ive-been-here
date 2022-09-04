//@ts-ignore
browser.tabs.onActivated.addListener((activeInfo) => {
    console.log("browser.tabs.onActivated with activeInfo: ", activeInfo);
});

//@ts-ignore
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("browser.tabs.onUpdated for tabId: ", tabId);
    if (changeInfo.status == "complete") {
        console.log("browser.tabs.onUpdated with tab: ", tab);
    }
});
