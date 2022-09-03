export interface Icon {
    size: number;
    src: string;
}

export const getActiveTabDomainFromURL = (URL: string): string | null => {
    const results = URL.match(/[^https//.][^w.][^ /]+/g);
    return results && !results[0].includes(" ") ? results[0] : null;
};

export const getWebsiteIconObject = (websiteURL: string | undefined): Icon => {
    const iconDesiredSize = 20;
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

export const howManyHoursInSeconds = (timeInSeconds: number): number => {
    const secondsInOneHour = 60 * 60;
    return (timeInSeconds - (timeInSeconds % secondsInOneHour)) / secondsInOneHour;
};

export const howManyMinutesInSeconds = (timeInSeconds: number): number => {
    const secondsInOneMinute = 60;
    if (timeInSeconds > secondsInOneMinute) {
        return Math.trunc((timeInSeconds / secondsInOneMinute) % secondsInOneMinute);
    } else {
        return 0;
    }
};

export const howManySecondsInSeconds = (timeInSeconds: number): number => {
    const secondsInOneMinute = 60;
    return timeInSeconds % secondsInOneMinute;
};
