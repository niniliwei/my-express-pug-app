// Global test setup for the travel blog application

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '0'; // Use random port for tests

// Mock console.log to reduce noise in test output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  // Suppress console.log during tests unless specifically needed
  console.log = jest.fn();
  
  // Keep console.error for debugging failed tests
  console.error = originalConsoleError;
});

afterAll(() => {
  // Restore original console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  
  // Force close any open handles
  if (global.gc) {
    global.gc();
  }
});

// Global test timeout
jest.setTimeout(10000);

// Mock Date.now() for consistent test results while keeping Date constructor intact
const originalDate = Date;
const mockDate = new Date('2024-01-15T00:00:00.000Z');
global.Date.now = jest.fn(() => mockDate.getTime());