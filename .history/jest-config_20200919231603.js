module.exports = {
    transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
    coveragePathIgnorePatterns: ['.history/'],
    moduleFileExtensions: ['ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/app/*.{js}', '.history/'],
    testResultsProcessor: 'jest-sonar-reporter',
};