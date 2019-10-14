//module.exports = {devServer: {https: true}}

module.exports = {
    chainWebpack: config => {
    config
        .module
        .rule("geojson")
        .test(/\.(json|geojson)$/)
        .use("json-loader")
        .loader("json-loader")
        .end();
    }
};