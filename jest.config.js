const { resolve } = require('path')
const root = resolve(__dirname)
// Global tests configuration
module.exports = {
    rootDir: root,
    displayName: 'root-tests',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    testEnvironment: 'node',
    clearMocks: true,
    preset: 'ts-jest',
    // Enabling aliases on jest
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1'
    }
}