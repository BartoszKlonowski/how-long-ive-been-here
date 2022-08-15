const path = require("path");

module.exports = {
    entry: {
        "popup/Popup": "./build/src/popup/Popup.js",
        "engine/Background": "./build/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
    },
};
