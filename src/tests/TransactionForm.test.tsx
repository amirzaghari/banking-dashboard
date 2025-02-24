import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TransactionForm from '../components/TransactionForm';
import transactionStore from '../store/transactionStore';

jest.mock('../store/transactionStore', () => ({
    __esModule: true,
    default: () => ({
        addTransaction: jest.fn(),
    }),
}));

test('should add a new transaction', () => {
    render(<TransactionForm />);

    fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Salary' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Deposit' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(transactionStore().addTransaction).toHaveBeenCalledWith({
        id: expect.any(String),
        amount: 100,
        description: 'Salary',
        date: expect.any(String),
        type: 'Deposit',
    });
});
