export function listenForClicks(document, browser) {
    document.addEventListener("click", (event) => {
        event.preventDefault();
    });
}
