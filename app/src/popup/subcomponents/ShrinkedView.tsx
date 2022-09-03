import React, {useEffect, useState} from "react";
import {
    getWebsiteIconObject,
    howManyHoursInSeconds,
    howManyMinutesInSeconds,
    howManySecondsInSeconds,
    Icon,
} from "../Utils";
import browser from "webextension-polyfill";

export const ShrinkedView = () => {
    const [icon, setIcon] = useState<Icon>(getWebsiteIconObject(""));
    const [timeInSeconds, setTimeInSeconds] = useState(0);

    useEffect(() => {
        browser.tabs
            .query({active: true})
            .then((result) => {
                console.log("setting icon to: ", result[0].url);
                setIcon(getWebsiteIconObject(result[0].url));
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

    const getMinutes = () => {
        const minutes = howManyMinutesInSeconds(timeInSeconds);
        return minutes < 10 ? `0${minutes}` : minutes.toString();
    };

    const getSeconds = () => {
        const seconds = howManySecondsInSeconds(timeInSeconds);
        return seconds < 10 ? `0${seconds}` : seconds.toString();
    };

    const getHours = () => howManyHoursInSeconds(timeInSeconds);

    return (
        <div className="shrinked-view-container">
            <div className="shrinked-view-icon-container">
                <img className="shrinked-view-icon" width={icon.size} height={icon.size} src={icon.src} />
            </div>
            <div className="shrinked-view-time-spent-text-container">
                <div className="shrinked-view-time-spent-text">
                    {getHours()}:{getMinutes()}:{getSeconds()}
                </div>
            </div>
        </div>
    );
};

export default ShrinkedView;
