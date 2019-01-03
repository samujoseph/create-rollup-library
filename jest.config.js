module.exports = {
    testEnvironment: "node",
    roots: [
        "<rootDir>/src/",
        "<rootDir>/tests/",
    ],
    bail: false, //whether to bail on first test failure
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    watchPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/bin/",
        "<rootDir>/lib/",
        "<rootDir>/rollup-library/",
    ],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/bin/",
        "<rootDir>/lib/",
        "<rootDir>/rollup-library/",
    ],
    verbose: true
};