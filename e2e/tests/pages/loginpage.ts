import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { DashboardPage } from './DashboardPage';
import { log } from '../utils/logger';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async visit(): Promise<void> {
        await this.navigateTo('/web/index.php/auth/login');
    }

    async loginUser(username: string, password: string): Promise<void> {
        log('ACTION: Filling username');
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        log('ACTION: Filling password (value hidden)');
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        log('ACTION: Clicking Login');
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async login(username: string, password: string): Promise<DashboardPage> {
        await this.loginUser(username, password);
        return new DashboardPage(this.page);
    }

    get dashboardText() {
        return this.page.getByRole('heading', { name: 'Dashboard' });
    }
}
