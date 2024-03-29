module.exports = {
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "prettier",
    ],
    env: {
        node: true,
        browser: false,
        jest: false,
        mocha: true,
    },
    parserOptions: {
        project: "./tsconfig.json",
    },
    rules: {
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        "no-prototype-builtins": "off",
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        "import/prefer-default-export": "off",
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        "react/destructuring-assignment": "off",
        // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
        "react/jsx-filename-extension": "off",
        // Use function hoisting to improve code readability
        "no-use-before-define": "off",
        "class-methods-use-this": "off",
        "consistent-return": "off",
        "global-require": "off",
        // Makes no sense to allow type inferrence for expression parameters, but require typing the response
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            { functions: false, classes: true, variables: true, typedefs: true },
        ],
        "@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: true }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "max-classes-per-file": "off",
    },
};
