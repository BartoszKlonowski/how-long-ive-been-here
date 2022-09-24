import React from "react";
import {translate} from "../../engine/i18n";

interface Props {
    isExpanded: boolean;
    onClick: (status: boolean) => void;
}

export const ViewChangeButton = ({isExpanded, onClick}: Props): JSX.Element => {
    return (
        <button
            className="view-change-button"
            itemType="button"
            onClick={() => {
                onClick(!isExpanded);
            }}>
            <div className="view-change-button-text">
                {isExpanded ? translate("shrink-button-label") : translate("expand-button-label")}
            </div>
        </button>
    );
};

export default ViewChangeButton;
