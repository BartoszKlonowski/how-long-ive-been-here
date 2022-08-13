import * as logic from "./MainPopupLogic";
import * as React from "react";
import ReactDOM from "react-dom";

export class MainPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div></div>
        );
    }
}

logic.listenForClicks(document, browser);
ReactDOM.render(<MainPopup />, document.getElementById("root"));
