import React, {useEffect, useState} from "react";
import {getActiveTabDomainFromURL, getHours, getMinutes, getSeconds, getWebsiteIconObject, Icon} from "../Utils";
import browser from "webextension-polyfill";
import Database from "../../engine/Database";

const getCurrentTimeForCurrentUrl = (domain: string): number => {
    const db = new Database();
    const timeSpent = (db.readTimeSpent(getActiveTabDomainFromURL(domain) || "") as number) || 0;
    return timeSpent;
};

export const ShrinkedView = () => {
    const [icon, setIcon] = useState<Icon>(getWebsiteIconObject(""));
    const [timeInSeconds, setTimeInSeconds] = useState(0);

    useEffect(() => {
        browser.tabs
            .query({active: true})
            .then((result) => {
                setIcon(getWebsiteIconObject(result[0].url));
                setTimeInSeconds(getCurrentTimeForCurrentUrl(result[0].url!));
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        const currentTimer = setInterval(() => {
            setTimeInSeconds(timeInSeconds + 1);
        }, 1000);

        return () => clearInterval(currentTimer);
    });

    return (
        <div className="shrinked-view-container">
            <div className="shrinked-view-icon-container">
                <img className="shrinked-view-icon" width={icon.size} height={icon.size} src={icon.src} />
            </div>
            <div className="shrinked-view-time-spent-text-container">
                <div className="shrinked-view-time-spent-text">
                    {getHours(timeInSeconds)}:{getMinutes(timeInSeconds)}:{getSeconds(timeInSeconds)}
                </div>
            </div>
        </div>
    );
};

export default ShrinkedView;
