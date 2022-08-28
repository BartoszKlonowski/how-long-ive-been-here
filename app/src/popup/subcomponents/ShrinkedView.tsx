import React, {useEffect, useState} from "react";
import {getWebsiteIconObject, Icon} from "../Utils";
import browser from "webextension-polyfill";

export const ShrinkedView = () => {
    const [icon, setIcon] = useState<Icon>(getWebsiteIconObject(""));

    useEffect(() => {
        browser.tabs
            .query({active: true})
            .then((result) => {
                setIcon(getWebsiteIconObject(result[0].url));
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
    }, []);

    return (
        <div className="shrinked-view-container">
            <img width={icon.size} height={icon.size} src={icon.src} />
            <p>Time spent here (placeholder)</p>
        </div>
    );
};

export default ShrinkedView;
