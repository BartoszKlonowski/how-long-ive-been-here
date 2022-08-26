import React, {useState} from "react";
import ReactDOM from "react-dom";
import DurationHeader from "./subcomponents/DurationHeader";
import ViewChangeButton from "./subcomponents/ViewChangeButton";

export const Popup = (): JSX.Element => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <DurationHeader />
            {expanded ? <div>ShrinkedViewPlaceholder</div> : <div>ExpandedViewPlaceholder</div>}
            <ViewChangeButton isExpanded={expanded} onClick={setExpanded} />
        </div>
    );
};

function listenForClicks(document: Document) {
    document.addEventListener("click", (event) => {
        event.preventDefault();
    });
}

listenForClicks(document);
ReactDOM.render(<Popup />, document.getElementById("root"));
