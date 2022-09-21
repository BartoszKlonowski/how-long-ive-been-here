import React from "react";
import {translate} from "../../engine/i18n";

export const DurationHeader = () => {
    return (
        <div className="duration-header">
            <div className="duration-header-text">{translate("duration-header")}</div>
        </div>
    );
};

export default DurationHeader;
