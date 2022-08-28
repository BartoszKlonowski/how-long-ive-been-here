import React from "react";
import TestRenderer, {ReactTestRenderer} from "react-test-renderer";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";

function render(): ReactTestRenderer {
    const shrinkedView = TestRenderer.create(<ShrinkedView />);
    return shrinkedView;
}

describe("ShrinkedView", () => {
    it("renders correctly according to snapshot", () => {
        const shrinkedView = render();
        expect(shrinkedView.toJSON()).toMatchSnapshot();
    });
});
