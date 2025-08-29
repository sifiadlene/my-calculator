const globals = require("globals");

module.exports = [
    // Configuration for all JavaScript files
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs", // Using CommonJS for Node.js project
            globals: {
                ...globals.node,     // Node.js globals
                ...globals.browser,  // Browser globals for client-side code
            }
        },
        rules: {
            // Basic ESLint recommended rules
            "no-unused-vars": "error",
            "no-undef": "error",
            "no-console": "off", // Allow console in Node.js project
            "prefer-const": "warn",
            "no-var": "error"
        }
    },
    
    // Configuration specifically for test files
    {
        files: ["test/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.mocha,    // Mocha test globals (describe, it, etc.)
                // Test-specific globals defined in test/helpers.js
                "request": "readonly",
                "expect": "readonly",
                "app": "readonly"
            }
        },
        rules: {
            // Test files can be more lenient
            "no-unused-vars": "warn"
        }
    },

    // Configuration for client-side JavaScript
    {
        files: ["public/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "script", // Browser scripts are often not modules
            globals: {
                ...globals.browser,
            }
        }
    }
];
