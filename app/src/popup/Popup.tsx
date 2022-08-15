import * as React from "react";
import ReactDOM from "react-dom";

interface Props {};

export class MainPopup extends React.Component {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <div></div>;
    }
}

function listenForClicks(document: Document) {
    document.addEventListener("click", (event) => {
        event.preventDefault();
    });
}

listenForClicks(document);
ReactDOM.render(<MainPopup />, document.getElementById("root"));
