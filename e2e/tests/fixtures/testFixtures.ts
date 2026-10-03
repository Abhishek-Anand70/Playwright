import { test as base, type Request } from '@playwright/test';
import { log, redactSecrets, safeUrl } from '../utils/logger';

export const test = base.extend({
  page: async ({ page, browserName }, use, testInfo) => {
    const requestStartedAt = new WeakMap<Request, number>();
    log(`BROWSER: ${browserName} test context ready`);
    page.on('request', request => {
      if (request.resourceType() !== 'xhr' && request.resourceType() !== 'fetch') return;
      requestStartedAt.set(request, Date.now());
      log(`API REQUEST: ${request.method()} ${safeUrl(request.url())}`);
    });
    page.on('response', response => {
      const request = response.request();
      if (request.resourceType() !== 'xhr' && request.resourceType() !== 'fetch') return;
      const startedAt = requestStartedAt.get(request) ?? Date.now();
      log(`API RESPONSE: ${request.method()} ${safeUrl(request.url())} ${response.status()} (${Date.now() - startedAt}ms)`);
    });
    page.on('requestfailed', request => {
      if (request.resourceType() !== 'xhr' && request.resourceType() !== 'fetch') return;
      log(`API REQUEST FAILED: ${request.method()} ${safeUrl(request.url())} (${request.failure()?.errorText ?? 'unknown error'})`);
    });

    log(`TEST STARTED: ${testInfo.title}`);
    await use(page);
    const result = testInfo.status === testInfo.expectedStatus ? 'PASSED' : 'FAILED';
    log(`TEST ${result}: ${testInfo.title}`);
    if (result === 'FAILED') {
      log(`FAILURE CONTEXT: URL=${safeUrl(page.url())}; ${redactSecrets(testInfo.error?.message ?? 'See Playwright error output')}`);
      log(`SCREENSHOT: ${testInfo.outputDir}/test-failed-1.png`);
      log(`VIDEO: ${testInfo.outputDir}/video.webm`);
      log(`TRACE: ${testInfo.outputDir}/trace.zip`);
    }
  },
});

export { expect } from '@playwright/test';
