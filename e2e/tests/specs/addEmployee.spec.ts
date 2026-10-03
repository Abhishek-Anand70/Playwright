import { test } from '../fixtures/testFixtures';
import { ADMIN_CREDENTIALS, TestDataFactory } from '../data/testData';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/loginpage';
import { PIMPage } from '../pages/PIMPage';
import { assertUrl } from '../utils/assertions';

test.describe('OrangeHRM Employee Management', () => {
    test('should login and add a new employee', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const employee = TestDataFactory.createEmployee();

        await loginPage.visit();
        const dashboardPage: DashboardPage = await loginPage.login(
            ADMIN_CREDENTIALS.username,
            ADMIN_CREDENTIALS.password
        );

        await dashboardPage.verifyDashboardLoaded();

        const pimPage: PIMPage = await dashboardPage.openPIM();
        const addEmployeePage = await pimPage.openAddEmployee();
        await addEmployeePage.addEmployee(employee.firstName, employee.lastName, employee.employeeId);

        await assertUrl(page, /\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    });
});
