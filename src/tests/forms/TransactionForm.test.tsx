import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TransactionForm from '../../forms/TransactionForm';

test('should add a new transaction', () => {
    const addTransactionMock = jest.fn();
    render(<TransactionForm addTransaction={addTransactionMock} />);

    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Salary' } });
    fireEvent.mouseDown(screen.getByLabelText(/type/i));
    const depositOption = screen.getByRole('option', { name: 'Deposit' });
    fireEvent.click(depositOption);
    fireEvent.submit(screen.getByRole('button', { name: /add transaction/i }));

    expect(addTransactionMock).toHaveBeenCalled();
});
