/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@ui/(.*)$': '<rootDir>/app/ui/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@services/(.*)$': '<rootDir>/services/$1'
  },
};

export default createJestConfig(config)
