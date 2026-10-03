import { Page } from '@playwright/test';
import { log } from '../utils/logger';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        log(`NAVIGATION: Opening ${url}`);
        await this.page.goto(url);
    }
}
