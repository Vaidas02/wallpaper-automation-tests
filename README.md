## Installation

After pulling this project please run this command to make everything work as expected:

```typescript
npm install
```

## Run tests

Before running tests you need to install ```npm``` (8 or abover), ```node``` (16 or above), ```typescript``` and ```ts-node``` globally.

To run frontend tests following command should be used, tests will run using 8 workers in headed mode:

```typescript
npm run test:fe
```
To open last HTML report run:

```typescript
npx playwright show-report playwright-report\fe
```

## .env file configuration

A sample environment configuration is provided in .env.example. Rename it to .env
Open the .env file and replace <YOUR_WEBSITE_URL> with your actual website URL
