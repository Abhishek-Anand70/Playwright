import { randomInt } from 'node:crypto';

export interface EmployeeData {
    firstName: string;
    lastName: string;
    employeeId: string;
}

const adminPassword = process.env.ORANGEHRM_PASSWORD;
if (!adminPassword) {
    throw new Error('ORANGEHRM_PASSWORD is required. Copy .env.example to .env and set the test account password.');
}

export const ADMIN_CREDENTIALS = {
    username: process.env.ORANGEHRM_USERNAME ?? 'Admin',
    password: adminPassword,
} as const;

export class TestDataFactory {
    static createEmployee(overrides: Partial<EmployeeData> = {}): EmployeeData {
        const uniqueSuffix = Date.now().toString().slice(-6);
        const employeeId = randomInt(100000, 1000000).toString();

        return {
            firstName: `Test${uniqueSuffix}`,
            lastName: 'Employee',
            employeeId,
            ...overrides,
        };
    }
}
