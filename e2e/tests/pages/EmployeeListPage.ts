import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { log } from '../utils/logger';

export class EmployeeListPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get searchInput() {
        return this.page.locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');
    }

    get employeeTable() {
        return this.page.locator('.oxd-table');
    }

    get employeeRows() {
        return this.page.locator('.oxd-table-card');
    }

    async searchByEmployeeId(employeeId: string): Promise<void> {
        log('ACTION: Searching employee by ID');
        await this.searchInput.fill(employeeId);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    getEmployeeRow(employeeId: string) {
        return this.employeeRows.filter({ hasText: employeeId });
    }
}
