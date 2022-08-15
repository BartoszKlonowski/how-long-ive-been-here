window.onload = () => {};

// @ts-ignore
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    message;
    sender;
    sendResponse;
});
