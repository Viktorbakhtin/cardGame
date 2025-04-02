const webpack = require("webpack");
const path = require("path");

const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

module.exports = (env) => {
    const devConfig = {
        mode: env.mode,

        devtool: "inline-source-map",

        devServer: {
            open: true,
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
        },

        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "dev"),
            }),
        ],
    };

    return devConfig;
};
