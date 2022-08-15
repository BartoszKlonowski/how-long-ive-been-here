import * as React from "react";
import ReactDOM from "react-dom";

export class MainPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <div></div>;
    }
}

function listenForClicks(document) {
    document.addEventListener("click", (event) => {
        event.preventDefault();
    });
}

listenForClicks(document);
ReactDOM.render(<MainPopup />, document.getElementById("root"));
