import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  entry: {
    "src/popup/Popup": "./build/src/popup/Popup.js",
    "src/engine/Background": "./build/src/engine/Background.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};

export default config;
