module.exports = {
    verbose: true,
    setupTestFrameworkScriptFile: "./enzyme.js",
    roots: [
        "./__tests__"
    ],
    moduleNameMapper: {
        ".scss$": "scss-stub.js"
    }
}