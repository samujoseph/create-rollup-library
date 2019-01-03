module.exports = {
    roots: ["<rootDir>/src/", "<rootDir>/tests/"],
    bail: false, //whether to bail on first test failure
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    watchPathIgnorePatterns: ["<rootDir>/node_modules/"],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    verbose: true
};