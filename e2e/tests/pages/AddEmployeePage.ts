import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { log } from '../utils/logger';

export class AddEmployeePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get firstNameInput() {
        return this.page.getByPlaceholder('First Name');
    }

    get lastNameInput() {
        return this.page.getByPlaceholder('Last Name');
    }

    get employeeIdInput() {
        return this.page.locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');
    }

    get saveButton() {
        return this.page.getByRole('button', { name: 'Save' });
    }

    async addEmployee(firstName: string, lastName: string, employeeId: string): Promise<void> {
        log('ACTION: Entering new employee details');
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.fill(employeeId);
        log('ACTION: Saving new employee');
        await this.saveButton.click();
        await this.page.waitForURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    }
}
