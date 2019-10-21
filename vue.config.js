//module.exports = {devServer: {https: true}}

module.exports = {
    chainWebpack: config => {
    config
        .module
        .rule("geojson")
        .test(/\.(geojson)$/)
        .use("json-loader")
        .loader("json-loader")
        .end();
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/variables.scss";`
            }
        }
    },
    devServer: {
        https: true
    }
};