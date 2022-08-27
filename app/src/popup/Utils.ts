export interface Icon {
    size: number;
    src: string;
}

export const getActiveTabDomainFromDocument = (document: Document): string | null => {
    const results = document.URL.match(/[^https//.][^w.][^ /]+/g);
    return results && !results[0].includes(" ") ? results[0] : null;
};

export const getWebsiteIconObject = (websiteURL: string): Icon => {
    const iconDesiredSize = 16;
    const iconSource: string = websiteURL.length
        ? `http://www.google.com/s2/favicons?domain=${websiteURL}`
        : "../resources/missing-website-favicon.png";

    const icon: Icon = {
        size: iconDesiredSize,
        src: iconSource,
    };
    return icon;
};
