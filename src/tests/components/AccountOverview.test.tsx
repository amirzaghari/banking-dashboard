import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountOverview from '../../components/AccountOverview';
import useTransactionStore from '../../store/transactionStore';

jest.mock('../../store/transactionStore');

describe('AccountOverview', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the balance, total income, and total expenses correctly', () => {
        (useTransactionStore as unknown as jest.Mock).mockReturnValue({
            balance: 1000.50,
            transactions: [
                { id: 1, type: 'Deposit', amount: 500.75 },
                { id: 2, type: 'Withdrawal', amount: 200.25 },
                { id: 3, type: 'Deposit', amount: 300.00 },
                { id: 4, type: 'Withdrawal', amount: 100.00 },
            ],
        });

        render(<AccountOverview />);

        expect(screen.getByText('Balance: €1000.50')).toBeInTheDocument();
        expect(screen.getByText('Total Income: €800.75')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses: €300.25')).toBeInTheDocument();
    });

    it('renders zero values correctly when there are no transactions', () => {
        (useTransactionStore as unknown as jest.Mock).mockReturnValue({
            balance: 0,
            transactions: [],
        });

        render(<AccountOverview />);

        expect(screen.getByText('Balance: €0.00')).toBeInTheDocument();
        expect(screen.getByText('Total Income: €0.00')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses: €0.00')).toBeInTheDocument();
    });

    it('renders correctly with only income transactions', () => {
        (useTransactionStore as unknown as jest.Mock).mockReturnValue({
            balance: 1500.75,
            transactions: [
                { id: 1, type: 'Deposit', amount: 500.75 },
                { id: 2, type: 'Deposit', amount: 1000.00 },
            ],
        });

        render(<AccountOverview />);

        expect(screen.getByText('Balance: €1500.75')).toBeInTheDocument();
        expect(screen.getByText('Total Income: €1500.75')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses: €0.00')).toBeInTheDocument();
    });

    it('renders correctly with only expense transactions', () => {
        (useTransactionStore as unknown as jest.Mock).mockReturnValue({
            balance: -300.25,
            transactions: [
                { id: 1, type: 'Withdrawal', amount: 200.25 },
                { id: 2, type: 'Withdrawal', amount: 100.00 },
            ],
        });

        render(<AccountOverview />);

        expect(screen.getByText('Balance: €-300.25')).toBeInTheDocument();
        expect(screen.getByText('Total Income: €0.00')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses: €300.25')).toBeInTheDocument();
    });
});