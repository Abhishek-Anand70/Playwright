# OrangeHRM Playwright tests

Playwright Test and TypeScript UI automation for the OrangeHRM demo. The existing Page Object Model is kept small: specs live under `e2e/tests/specs`, page objects under `e2e/tests/pages`, shared test data under `e2e/tests/data`, and logging/assertion helpers under `e2e/tests/utils`.

## Setup

Install the locked dependencies and copy the environment template:

```powershell
npm ci
Copy-Item .env.example .env
```

Set `ORANGEHRM_PASSWORD` in `.env`. Set `ORANGEHRM_USERNAME` and `ORANGEHRM_BASE_URL` there too when using a different account or environment. `.env` is ignored by Git. The public OrangeHRM demo is shared; employee tests create records, so use a disposable environment when possible.

For GitHub Actions, configure the repository secret `ORANGEHRM_PASSWORD`; the workflow passes it to the test process without printing it.

Install the Playwright browsers if needed:

```powershell
npx playwright install
```

## Run

```powershell
npm test                   # all configured browsers, headless by default
npm run test:headed        # visible Chromium
npm run test:login         # login spec in headless Chromium
npm run test:debug         # Chromium with Playwright Inspector
npm run test:ui            # Playwright UI mode
npm run typecheck          # TypeScript check
npm run report             # open HTML report on port 9324
```

Set `PLAYWRIGHT_SLOW_MO=150` in `.env` to slow headed browser actions slightly. CI runs headless with one worker. `PLAYWRIGHT_WORKERS` can override the default single worker for a faster, isolated test environment.

## Logging and failure artifacts

The terminal reports test start/end, browser, navigation, page actions, and browser `fetch`/XHR requests with method, sanitized URL, status, and duration. It does not log request or response bodies, headers, cookies, or credentials; the password action and failure text are redacted. A dedicated API test/client layer does not exist yet.

Playwright stores results in `test-results/` and the HTML report in `playwright-report/`. Screenshots are captured on failure, videos are retained on failure, and traces are retained on failure. Open the report with `npm run report` or inspect a trace with `npx playwright show-trace <trace.zip>`.

## Current coverage

- Admin login and dashboard visibility.
- Add an employee.
- Add an employee and find the record by employee ID.

There are currently no API tests, invalid-login cases, or logout tests in the project.
