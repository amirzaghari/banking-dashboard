import useTransactionStore from '../store/transactionStore';

describe('Transaction Store', () => {
    beforeEach(() => {
        useTransactionStore.setState({
            transactions: [],
            balance: 0,
        });
    });

    test('should add a transaction and update balance', () => {
        const store = useTransactionStore.getState();

        store.addTransaction({
            id: '1',
            date: '2023-10-01',
            amount: 100,
            description: 'Salary',
            type: 'Deposit',
        });

        expect(store.transactions.length).toBe(1);
        expect(store.transactions[0].description).toBe('Salary');

        expect(store.balance).toBe(100); // You might need logic to correctly update the balance
    });

    test('should remove a transaction and update balance', () => {
        const store = useTransactionStore.getState();

        store.addTransaction({
            id: '1',
            date: '2023-10-01',
            amount: 100,
            description: 'Salary',
            type: 'Deposit',
        });

        store.removeTransaction('1');

        expect(store.transactions.length).toBe(0);

        expect(store.balance).toBe(0);
    });
});
