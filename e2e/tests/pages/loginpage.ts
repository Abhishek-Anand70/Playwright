import { Page } from '@playwright/test';

export class LoginPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        );
    }

    async loginUser(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    get dashboardText() {
        return this.page.getByRole('heading', { name: 'Dashboard' });
    }
}