import React, {useEffect, useState} from "react";
import {getActiveTabDomainFromURL, getHours, getMinutes, getSeconds, getWebsiteIconObject, Icon} from "../Utils";
import browser from "webextension-polyfill";
import Database from "../../engine/Database";

const getCurrentTimeForCurrentDomain = (domain: string): number => {
    const db = new Database();
    const timeSpent = (db.readTimeSpent(domain) as number) || 0;
    return timeSpent;
};

export const ShrinkedView = () => {
    const [icon, setIcon] = useState<Icon>(getWebsiteIconObject(""));
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [activeDomain, setActiveDomain] = useState("");

    useEffect(() => {
        browser.tabs
            .query({active: true})
            .then((result) => {
                const domain = getActiveTabDomainFromURL(result[0].url!) || "";
                setIcon(getWebsiteIconObject(domain));
                setTimeInSeconds(getCurrentTimeForCurrentDomain(domain));
                setActiveDomain(domain);
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        return () => {
            const db = new Database();
            db.writeTimeSpent(activeDomain, timeInSeconds);
        };
    }, [activeDomain, timeInSeconds]);

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
