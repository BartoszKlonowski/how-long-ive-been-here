import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";
import ExpandedView from "../app/src/popup/subcomponents/ExpandedView";

function renderShrinkedView(): ReactTestRenderer {
    const shrinkedView = TestRenderer.create(<ShrinkedView />);
    return shrinkedView;
}

async function renderShrinkedViewAsObject(): Promise<ReactTestInstance> {
    let component;
    await act(async () => {
        component = TestRenderer.create(<ShrinkedView />);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
}

function renderExpandedView(): ReactTestRenderer {
    const expandedView = TestRenderer.create(<ExpandedView />);
    return expandedView;
}

async function renderExpandedViewAsObject(): Promise<ReactTestInstance> {
    let component;
    await act(async () => {
        component = TestRenderer.create(<ExpandedView />);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
}

function getChild(renderedObject: ReactTestInstance, childIndex: number): ReactTestInstance {
    const child = renderedObject.children[childIndex] as ReactTestInstance;
    return child;
}

describe("ShrinkedView", () => {
    it("renders correctly according to snapshot", () => {
        const shrinkedView = renderShrinkedView();
        expect(shrinkedView.toJSON()).toMatchSnapshot();
    });

    it("renders icon as image with default src when missing icon on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderShrinkedViewAsObject();
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
        const shrinkedView = await renderShrinkedViewAsObject();
        const img = getChild(getChild(shrinkedView, 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("http://www.google.com/s2/favicons?domain=proper-existing-icon-url");
    });

    it("displays 0 time spent for incorrect domain", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderShrinkedViewAsObject();
        const timeSpentText = getChild(getChild(shrinkedView, 1), 0);
        expect(timeSpentText).toBeDefined();
        expect(`${getChild(timeSpentText, 0)}:${getChild(timeSpentText, 2)}:${getChild(timeSpentText, 4)}`).toBe(
            "0:00:00"
        );
    });
});

describe("ExpandedView", () => {
    it("renders correctly according to snapshot", () => {
        const expandedView = renderExpandedView();
        expect(expandedView.toJSON()).toMatchSnapshot();
    });

    it("contains an empty list when no data in timeSpent storage", async () => {
        global._localStorage.getItem = (key: string) => {
            return key ? `{}` : null;
        };
        const expandedView = await renderExpandedViewAsObject();
        expect(expandedView).toBeDefined();
        expect(getChild(expandedView, 0).children).toBeNull();
    });

    it("contains a list items of proper type and layout", async () => {
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", 20], ["fake", 20]]`;
        };
        const expandedView = await renderExpandedViewAsObject();
        const mainList = getChild(expandedView, 0);
        expect(mainList.type).toBe("ul");
        expect(getChild(mainList, 0).type).toBe("li");
        expect(getChild(mainList, 1).type).toBe("li");
    });

    it("contains a list with proper number of items", async () => {
        global._localStorage.getItem = (key: string) => {
            return `[["first item", 10],["second item", 20],["${key}", 30]]`;
        };
        const expandedView = await renderExpandedViewAsObject();
        expect(getChild(expandedView, 0).children.length).toBe(3);
    });
});
