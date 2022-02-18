module.exports = {
  preset           : 'ts-jest',
  testEnvironment  : 'node',
  moduleNameMapper : {
    '^~/(.*)': '<rootDir>/src/$1'
  },
  notify              : true,
  notifyMode          : 'always',
  verbose             : true,
  runner              : 'jest-serial-runner',
  collectCoverageFrom : [
    'src/**/{!(ignored),}.ts',
    '!**/node_modules/**',
  ],
  testRegex              : '^src/.*/__tests__/.*|(\\.|/)test\\.ts$',
  testPathIgnorePatterns : [
    'src/.*\\.ignored\\.ts'
  ]
};
