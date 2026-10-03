import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PIMPage } from './PIMPage';
import { log } from '../utils/logger';

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get dashboardHeading() {
        return this.page.getByRole('heading', { name: 'Dashboard' });
    }

    get pimMenu() {
        return this.page.getByRole('link', { name: 'PIM' });
    }

    async openPIM(): Promise<PIMPage> {
        log('ACTION: Opening PIM');
        await this.pimMenu.click();
        await expect(this.page.getByRole('link', { name: /Add Employee/i })).toBeVisible();
        return new PIMPage(this.page);
    }

    async verifyDashboardLoaded(): Promise<void> {
        await expect(this.dashboardHeading).toBeVisible();
        await expect(this.dashboardHeading).toHaveText('Dashboard');
    }
}
