module.exports = {
    globals: {
        'ts-jest': {
            tsConfigFile: './src/tsconfig.spec.json',
        },
        __TRANSFORM_HTML__: true,
    },
    setupTestFrameworkScriptFile: '<rootDir>/node_modules/@angular-builders/jest/src/jest-config/setup.js',
    transform: {
        '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
    },
    testMatch: ['**/__tests__/**/*.+(ts|js)?(x)', '**/+(*.)+(spec|test).+(ts|js)?(x)'],
    moduleNameMapper: {
        //For avoid long imports with ...
        "app/(.*)": "<rootDir>/src/app/$1",
        "@common/(.*)": "<rootDir>/src/app/common/$1",
    },
    transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
    collectCoverageFrom: [
        '{src|projects}/**/{src|lib}/**/*.{ts}',
        '!{src|projects}/*.{ts}',
        '!{src|projects}/**/*.{js}',
        '!{src|projects}/**/environments/*.{ts}',
        '!{src|projects}/**/model/*.{ts}',
        '!{src|projects}/**/*.module.{ts}',
        '!{src|projects}/**/*public_api.{ts}',
        '!{src|projects}/**/main.{ts}',
        '!{src|projects}/**/polyfills.{ts}',
        '!{src|projects}/**/*index.{ts}',
        '!{src|projects}/**/*test.{ts}',
        '!{src|projects}/**/*.enum.{ts}',
        '!{src|projects}/**/*.state.{ts}',
        '!{src|projects}/**/*.entity.{ts}',
        '!**/**e2e/**/*.{ts}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coveragePathIgnorePatterns: ['.history/'],
    moduleFileExtensions: ['ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/app/*.{js}', '.history/'],
    testResultsProcessor: 'jest-sonar-reporter',
};