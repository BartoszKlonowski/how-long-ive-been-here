import React from "react";
import TestRenderer, {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";
import type {Browser} from "webextension-polyfill";
import {deepMock, MockzillaDeep} from "mockzilla";

function render(): ReactTestRenderer {
    const shrinkedView = TestRenderer.create(<ShrinkedView />);
    return shrinkedView;
}

function renderAsObject(): ReactTestInstance {
    const shrinkedView = JSON.parse(JSON.stringify(TestRenderer.create(<ShrinkedView />).toJSON()));
    return shrinkedView;
}

function getChild(renderedObject: ReactTestInstance, childIndex: number): ReactTestInstance {
    const child = renderedObject.children[childIndex] as ReactTestInstance;
    return child;
}

describe("ShrinkedView", () => {
    it("renders correctly according to snapshot", () => {
        const shrinkedView = render();
        expect(shrinkedView.toJSON()).toMatchSnapshot();
    });
});
