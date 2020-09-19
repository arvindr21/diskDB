module.exports = {
    transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
    coveragePathIgnorePatterns: ['.history/'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/app/*.{js}', '.history/']
};