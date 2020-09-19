module.exports = {
    verbose: true,
    setupTestFrameworkScriptFile: "./enzyme.js",
    roots: [
        "../__tests__"
    ],
    modulePaths: [
        "./__stubs__"
    ],
    moduleNameMapper: {
        ".scss$": "scss-stub.js"
    }
}