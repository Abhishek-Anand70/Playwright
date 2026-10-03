import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AddEmployeePage } from './AddEmployeePage';
import { EmployeeListPage } from './EmployeeListPage';
import { expect } from '@playwright/test';
import { log } from '../utils/logger';

export class PIMPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get addEmployeeLink() {
        return this.page.getByRole('link', { name: /Add Employee/i });
    }

    get employeeListLink() {
        return this.page.getByRole('link', { name: 'Employee List' });
    }

    async openAddEmployee(): Promise<AddEmployeePage> {
        log('ACTION: Opening Add Employee');
        await this.addEmployeeLink.click();
        await expect(this.page.getByPlaceholder('First Name')).toBeVisible();
        return new AddEmployeePage(this.page);
    }

    async openEmployeeList(): Promise<EmployeeListPage> {
        log('ACTION: Opening Employee List');
        await this.employeeListLink.click();
        await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible();
        return new EmployeeListPage(this.page);
    }
}
