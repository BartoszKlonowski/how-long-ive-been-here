export interface Icon {
    size: number;
    src: string;
}

export const getActiveTabDomainFromURL = (URL: string): string | null => {
    const results = URL.match(/[^https//.][^w.][^ /]+/g);
    return results && !results[0].includes(" ") ? results[0] : null;
};

export const getWebsiteIconObject = (websiteURL: string | undefined): Icon => {
    const iconDesiredSize = 16;
    const iconSource: string =
        websiteURL && websiteURL.length
            ? `http://www.google.com/s2/favicons?domain=${websiteURL}`
            : "../resources/missing-website-favicon.png";

    const icon: Icon = {
        size: iconDesiredSize,
        src: iconSource,
    };
    return icon;
};
