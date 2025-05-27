module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)', '**/?(*.)+(spec|test).(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/app.ts', // Exclude main app file from coverage as it starts the server
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testTimeout: 10000,
  forceExit: true,
  detectOpenHandles: true,
};