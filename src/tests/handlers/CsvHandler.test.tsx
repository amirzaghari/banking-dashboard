import React from 'react';
import { waitFor } from '@testing-library/react';
import CsvHandler, { CsvHandlerRef } from '../../handlers/CsvHandler';
import useTransactionStore from '../../store/transactionStore';
import Papa from 'papaparse';

jest.mock('../../store/transactionStore');
jest.mock('papaparse');

describe('CsvHandler', () => {
    let csvHandlerRef: CsvHandlerRef;

    beforeEach(() => {
        jest.clearAllMocks();

        (useTransactionStore as unknown as jest.Mock).mockReturnValue({
            transactions: [
                { id: '1', date: '2023-10-01', amount: 100, description: 'Salary', type: 'Deposit' },
                { id: '2', date: '2023-10-02', amount: 50, description: 'Groceries', type: 'Withdrawal' },
            ],
            addTransaction: jest.fn(),
        });

        (Papa.unparse as jest.Mock).mockImplementation((data) => JSON.stringify(data));

        csvHandlerRef = {
            handleExport: jest.fn(),
            handleImport: jest.fn(),
        };
    });

    it('handles errors during CSV import', async () => {
        (Papa.parse as jest.Mock).mockImplementation((_, options) => {
            options.error(new Error('Failed to parse CSV'));
        });

        csvHandlerRef.handleImport({ target: { value: 'mock-csv-data' } } as any);

        await waitFor(() => {
            expect(useTransactionStore().addTransaction).not.toHaveBeenCalled();
        });
    });

    it('handles invalid data during CSV import', async () => {
        (Papa.parse as jest.Mock).mockImplementation((_, options) => {
            options.complete({
                data: [{ Date: '', Amount: 'invalid', Description: '', Type: '' }],
            });
        });

        csvHandlerRef.handleImport({ target: { value: 'mock-csv-data' } } as any);

        await waitFor(() => {
            expect(useTransactionStore().addTransaction).not.toHaveBeenCalled();
        });
    });
});
