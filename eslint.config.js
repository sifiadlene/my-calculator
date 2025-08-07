const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "script",
            globals: {
                "console": "readonly",
                "process": "readonly",
                "module": "readonly",
                "require": "readonly",
                "exports": "readonly",
                "__dirname": "readonly",
                "__filename": "readonly",
                "Buffer": "readonly",
                "global": "readonly",
                "setTimeout": "readonly",
                "clearTimeout": "readonly",
                "setInterval": "readonly",
                "clearInterval": "readonly",
                "describe": "readonly",
                "it": "readonly",
                "before": "readonly",
                "after": "readonly",
                "beforeEach": "readonly",
                "afterEach": "readonly",
                "expect": "readonly",
                "request": "readonly",
                "app": "readonly"
            }
        },
        rules: {}
    }
];