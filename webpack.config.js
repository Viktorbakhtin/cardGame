const path = require("path");

const merge = require("webpack-merge").merge;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    const config = {
        entry: "./src/index.js",

        resolve: {
            extensions: [".js", ".json"],
        },

        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: "assets/**",
                        // if there are nested subdirectories , keep the hierarchy
                        to({ context, absoluteFilename }) {
                            const assetsPath = path.resolve(__dirname, "assets");

                            if (!absoluteFilename) {
                                throw Error();
                            }

                            const endPath = absoluteFilename.slice(assetsPath.length);

                            return Promise.resolve(`assets/${endPath}`);
                        },
                    },
                ],
            }),
        ],
    };
    const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.js`))(env);

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};
