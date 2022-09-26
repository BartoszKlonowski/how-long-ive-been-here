import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";
import ExpandedView from "../app/src/popup/subcomponents/ExpandedView";
import ViewChangeButton from "../app/src/popup/subcomponents/ViewChangeButton";

function renderElement(element: JSX.Element): ReactTestRenderer {
    const component = TestRenderer.create(element);
    return component;
}

async function renderElementAsObject(element: JSX.Element): Promise<ReactTestInstance> {
    let component;
    await act(async () => {
        component = TestRenderer.create(element);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
}

function getChild(renderedObject: ReactTestInstance, childIndex: number): ReactTestInstance {
    const child = renderedObject.children[childIndex] as ReactTestInstance;
    return child;
}

describe("ShrinkedView", () => {
    it("renders correctly according to snapshot", () => {
        const shrinkedView = renderElement(<ShrinkedView />);
        expect(shrinkedView.toJSON()).toMatchSnapshot();
    });

    it("renders icon as image with default src when missing icon on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        const img = getChild(getChild(shrinkedView, 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("../resources/missing-website-favicon.png");
    });

    it("renders icon as image with proper src when icon is available on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: "proper.existing.icon.url"}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        const img = getChild(getChild(shrinkedView, 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("https://icons.duckduckgo.com/ip3/proper.existing.icon.url.ico");
    });

    it("displays 0 time spent for incorrect domain", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        const timeSpentText = getChild(getChild(shrinkedView, 1), 0);
        expect(timeSpentText).toBeDefined();
        expect(`${getChild(timeSpentText, 0)}:${getChild(timeSpentText, 2)}:${getChild(timeSpentText, 4)}`).toBe(
            "0:00:00"
        );
    });
});

describe("ExpandedView", () => {
    it("renders correctly according to snapshot", () => {
        const expandedView = renderElement(<ExpandedView />);
        expect(expandedView.toJSON()).toMatchSnapshot();
    });

    it("contains an empty list when no data in timeSpent storage", async () => {
        global._localStorage.getItem = (key: string) => {
            return key ? `{}` : null;
        };
        const expandedView = await renderElementAsObject(<ExpandedView />);
        expect(expandedView).toBeDefined();
        expect(getChild(expandedView, 0).children).toBeNull();
    });

    it("contains a list items of proper type and layout", async () => {
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", 20], ["fake", 20]]`;
        };
        const expandedView = await renderElementAsObject(<ExpandedView />);
        const mainList = getChild(expandedView, 0);
        expect(mainList.type).toBe("ul");
        expect(getChild(mainList, 0).type).toBe("li");
        expect(getChild(mainList, 1).type).toBe("li");
    });

    it("contains a list with proper number of items", async () => {
        global._localStorage.getItem = (key: string) => {
            return `[["first item", 10],["second item", 20],["${key}", 30]]`;
        };
        const expandedView = await renderElementAsObject(<ExpandedView />);
        expect(getChild(expandedView, 0).children.length).toBe(3);
    });
});

describe("ViewChangeButton", () => {
    it("renders correctly regarding the snapshot", () => {
        global.browser.i18n.getUILanguage = () => "EN";
        const button = renderElement(
            <ViewChangeButton
                isExpanded={false}
                onClick={(_: boolean) => {
                    _;
                }}
            />
        );
        expect(button).toMatchSnapshot();
    });

    it("is created by a button type", async () => {
        global.browser.i18n.getUILanguage = () => "EN";
        const button = await renderElementAsObject(
            <ViewChangeButton
                isExpanded={false}
                onClick={(_) => {
                    _;
                }}
            />
        );
        expect(button.type).toBe("button");
    });
});
