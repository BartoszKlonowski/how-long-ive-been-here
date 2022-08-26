import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import DurationHeader from "./subcomponents/DurationHeader";
import ViewChangeButton from "./subcomponents/ViewChangeButton";

export const Popup = (): JSX.Element => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }, [document]);

    return (
        <div>
            <DurationHeader />
            {expanded ? <div>ShrinkedViewPlaceholder</div> : <div>ExpandedViewPlaceholder</div>}
            <ViewChangeButton isExpanded={expanded} onClick={setExpanded} />
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
