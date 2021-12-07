module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "plugins": [
        "vue",
        "promise",
        "prettier",
    ],
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "plugin:promise/recommended",
        "plugin:vue/essential",
        "plugin:vue/base",
        "plugin:prettier/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "_": false,
        "cordova": false,
        "opts": false,
        "WL": false,
        "fail": false,
        "jasmine": false,
        "Camera": false,
        "StatusBar": false,
        "IRoot": false,
        "SafariViewController": false
    },
    "parser": "vue-eslint-parser", //https://eslint.vuejs.org/user-guide/#faq
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "prefer-destructuring": "off",
        "prettier/prettier": "error",               // Rely eslint-prettier for formatting code 
        "camelcase": "error",                       // Allow only camelcase e.g: helloMyName
        "dot-notation": ["error", {
            "allowPattern": "^[a-z]+(_[a-z]+)+$"    // Allow snakecase (exception) e.g: hello_my_name
        }],
        "no-underscore-dangle": "off",              // Allow underscore dangle variables e.g: _bar, bar_
        "no-unused-expressions": "off",             // Allow unused expressions
        "no-shadow": ["warn", { "allow": ["done"] }],
        "no-param-reassign": ["warn", { "ignorePropertyModificationsFor": ["state"] }],
        "func-names": "warn",
        "no-bitwise": "warn",
        "no-redeclare": "warn",
        "no-use-before-define": "off",
        "promise/always-return": "off",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-new-statics": "off",
        "class-methods-use-this": "off",
        "no-console": "off",
        "no-debugger": "error",
        "no-alert": "off",
    }
}