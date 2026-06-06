import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginpage';

test('User login test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.visit();

    await loginPage.loginUser('Admin', 'admin123');

    await expect(loginPage.dashboardText).toHaveText('Dashboard');
});