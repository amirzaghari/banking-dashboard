import { act } from 'react';
import useTransactionStore, { Transaction } from '../../store/transactionStore';

const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key: string) => {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('useTransactionStore', () => {
    beforeEach(() => {
        localStorage.clear();
        useTransactionStore.setState(useTransactionStore.getInitialState());
    });

    it('initializes with default transactions and balance', () => {
        const { transactions, balance } = useTransactionStore.getState();

        expect(transactions).toHaveLength(3);
        expect(balance).toBe(200);
    });

    it('adds a new transaction and updates balance', () => {
        const newTransaction: Transaction = {
            id: '4',
            date: '2024-01-15',
            amount: 300,
            description: 'Bonus',
            type: 'Deposit',
        };

        act(() => {
            useTransactionStore.getState().addTransaction(newTransaction);
        });

        const { transactions, balance } = useTransactionStore.getState();
        expect(transactions).toHaveLength(4);
        expect(transactions).toContainEqual(newTransaction);
        expect(balance).toBe(500);
    });

    it('does not add a transaction with invalid description or amount', () => {
        const invalidTransaction1: Transaction = {
            id: '5',
            date: '2024-01-20',
            amount: 0,
            description: '',
            type: 'Deposit',
        };

        const invalidTransaction2: Transaction = {
            id: '6',
            date: '2024-01-21',
            amount: -100,
            description: 'Invalid Amount',
            type: 'Deposit',
        };

        act(() => {
            useTransactionStore.getState().addTransaction(invalidTransaction1);
            useTransactionStore.getState().addTransaction(invalidTransaction2);
        });

        const { transactions } = useTransactionStore.getState();
        expect(transactions).toHaveLength(3);
    });

    it('removes a transaction and updates balance', () => {
        const transactionIdToRemove = '2';

        act(() => {
            useTransactionStore.getState().removeTransaction(transactionIdToRemove);
        });

        const { transactions, balance } = useTransactionStore.getState();
        expect(transactions).toHaveLength(2);
        expect(transactions.find((t) => t.id === transactionIdToRemove)).toBeUndefined();
        expect(balance).toBe(400);
    });

    it('undoes the last removed transaction', () => {
        const transactionIdToRemove = '2';

        act(() => {
            useTransactionStore.getState().removeTransaction(transactionIdToRemove);
            useTransactionStore.getState().undoTransaction();
        });

        const { transactions, balance } = useTransactionStore.getState();
        expect(transactions).toHaveLength(3);
        expect(balance).toBe(200);
    });

    it('updates a transaction and updates balance', () => {
        const updatedTransaction: Transaction = {
            id: '2',
            date: '2024-01-05',
            amount: 150,
            description: 'Groceries',
            type: 'Withdrawal',
        };

        act(() => {
            useTransactionStore.getState().updateTransaction('2', updatedTransaction);
        });

        const { transactions, balance } = useTransactionStore.getState();
        expect(transactions).toContainEqual(updatedTransaction);
        expect(balance).toBe(250);
    });

    it('does not update a transaction with invalid description or amount', () => {
        const invalidTransaction: Transaction = {
            id: '2',
            date: '2024-01-05',
            amount: -100,
            description: '',
            type: 'Withdrawal',
        };

        act(() => {
            useTransactionStore.getState().updateTransaction('2', invalidTransaction);
        });

        const { transactions } = useTransactionStore.getState();
        expect(transactions.find((t) => t.id === '2')?.amount).toBe(200);
    });
});