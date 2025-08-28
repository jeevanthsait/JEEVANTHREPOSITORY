import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',             // Use ts-jest preset for TypeScript
  testEnvironment: 'node',       // Since you are testing backend (Express)
  roots: ['<rootDir>/tests'],    // Where your test files live
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  testMatch: [
    '**/tests/**/*.test.ts',     // Match test files
    '**/?(*.)+(spec|test).ts'
  ],
  clearMocks: true,
};

export default config;
