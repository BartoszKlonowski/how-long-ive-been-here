export const getActiveTabDomainFromDocument = (document: Document): string | null => {
    const results = document.URL.match(/[^https//.][^w.][^ /]+/g);
    return results && !results[0].includes(" ") ? results[0] : null;
};

export const getWebsiteIconObject = (websiteURL: string) => {
    const iconDesiredSize = 16;
    const iconSource: string = websiteURL.length
        ? `http://www.google.com/s2/favicons?domain=${websiteURL}`
        : "../resources/missing-website-favicon.png";

    return {
        size: iconDesiredSize,
        src: iconSource,
    };
};
