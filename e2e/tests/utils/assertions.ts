import { expect, Locator, Page } from '@playwright/test';

export async function assertText(locator: Locator, expectedText: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText(expectedText);
}

export async function assertContainsText(locator: Locator, expectedText: string): Promise<void> {
  await expect(locator).toBeVisible();
  await expect(locator).toContainText(expectedText);
}

export async function assertRowVisibleByText(locator: Locator, text: string): Promise<void> {
  await expect(locator.filter({ hasText: text })).toBeVisible();
}

export async function assertUrl(page: Page, expectedUrl: RegExp): Promise<void> {
  await expect(page).toHaveURL(expectedUrl);
}
