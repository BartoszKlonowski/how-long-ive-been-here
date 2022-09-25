import Database from "../engine/Database";

export interface Icon {
    size: number;
    src: string;
}

export const getActiveTabDomainFromURL = (URL: string): string | null => {
    let result = URL.replace("https://", "");
    result = result.replace("http://", "");
    const results = result.match(/[^w.][^ /]+/g);
    return results && !results[0].includes(" ") && results[0].includes(".") ? results[0] : null;
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

export function storeTimeSpentSummary(currentDomain: string) {
    const db = new Database();
    const previousDomain = db.readPreviousDomain();

    if (currentDomain.length > 0 && previousDomain !== currentDomain) {
        db.writePreviousDomain(currentDomain);
        db.writeLastActive(currentDomain, new Date());

        const lastActive = db.readLastActive(previousDomain);
        const timeSpent = Math.trunc(Math.abs(Date.now() - lastActive.getTime()) / 1000);
        const totalTimeSpentOfLastActive = (db.readTimeSpent(previousDomain) as number) + timeSpent;
        db.writeTimeSpent(previousDomain, totalTimeSpentOfLastActive);
    }
}

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

export const getMinutes = (timeInSeconds: number) => {
    const minutes = howManyMinutesInSeconds(timeInSeconds);
    return minutes < 10 ? `0${minutes}` : minutes.toString();
};

export const getSeconds = (timeInSeconds: number) => {
    const seconds = howManySecondsInSeconds(timeInSeconds);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
};

export const getHours = (timeInSeconds: number) => howManyHoursInSeconds(timeInSeconds);
