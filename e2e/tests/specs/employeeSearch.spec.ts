import { test } from '../fixtures/testFixtures';
import { ADMIN_CREDENTIALS, TestDataFactory } from '../data/testData';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/loginpage';
import { PIMPage } from '../pages/PIMPage';
import { assertRowVisibleByText } from '../utils/assertions';

test('admin can find an employee by employee ID', async ({ page }) => {
    const employee = TestDataFactory.createEmployee();
    const loginPage = new LoginPage(page);

    await loginPage.visit();
    const dashboardPage: DashboardPage = await loginPage.login(
        ADMIN_CREDENTIALS.username,
        ADMIN_CREDENTIALS.password
    );
    await dashboardPage.verifyDashboardLoaded();

    const pimPage: PIMPage = await dashboardPage.openPIM();
    const addEmployeePage: AddEmployeePage = await pimPage.openAddEmployee();
    await addEmployeePage.addEmployee(employee.firstName, employee.lastName, employee.employeeId);

    const employeeListPage = await new PIMPage(page).openEmployeeList();
    await employeeListPage.searchByEmployeeId(employee.employeeId);
    await assertRowVisibleByText(employeeListPage.getEmployeeRow(employee.employeeId), employee.employeeId);
});
