import React from "react";

interface Props {
    isExpanded: boolean;
    onClick: (status: boolean) => void;
}

export const ViewChangeButton = ({isExpanded, onClick}: Props): JSX.Element => {
    return (
        <div
            className="view-change-button"
            onClick={() => {
                onClick(!isExpanded);
            }}>
            <p className="view-change-button-text">{isExpanded ? "Shrink" : "Expand"}</p>
        </div>
    );
};

export default ViewChangeButton;
