const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.mocha,
            ...globals.request,
        },

        "ecmaVersion": "latest",
        "sourceType": "module",
        parserOptions: {},
    },

    "extends": "eslint:recommended",
    "rules": {},
}]);
