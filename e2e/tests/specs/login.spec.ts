import { test } from '../fixtures/testFixtures';
import { ADMIN_CREDENTIALS } from '../data/testData';
import { LoginPage } from '../pages/loginpage';
import { assertText } from '../utils/assertions';

test('admin can log in and reach the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.visit();
    await loginPage.loginUser(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);

    await assertText(loginPage.dashboardText, 'Dashboard');
});
