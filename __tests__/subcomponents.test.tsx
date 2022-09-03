import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";

function render(): ReactTestRenderer {
    const shrinkedView = TestRenderer.create(<ShrinkedView />);
    return shrinkedView;
}

async function renderAsObject(): Promise<ReactTestInstance> {
    let component;
    await act(async () => {
        component = TestRenderer.create(<ShrinkedView />);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
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

    it("renders icon as image with default src when missing icon on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderAsObject();
        const img = getChild(getChild(shrinkedView, 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("../resources/missing-website-favicon.png");
    });

    it("renders icon as image with proper src when icon is available on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: "proper-existing-icon-url"}]);
            });
        };
        const shrinkedView = await renderAsObject();
        const img = getChild(getChild(shrinkedView, 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("http://www.google.com/s2/favicons?domain=proper-existing-icon-url");
    });
});
