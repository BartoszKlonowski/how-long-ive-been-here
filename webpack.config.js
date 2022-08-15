const path = require("path");

module.exports = {
    entry: {
        "src/popup/Popup": "./build/src/popup/Popup.js",
        "src/engine/Background": "./build/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
    },
};
