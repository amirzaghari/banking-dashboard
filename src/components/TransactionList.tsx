import useTransactionStore, { Transaction } from "../store/transactionStore";

const TransactionList = () => {
    const { transactions, removeTransaction, updateTransaction } = useTransactionStore();

    const handleEdit = (id: string) => {
        const newDescription = prompt("Enter new description:");
        if (newDescription) {
            const updatedTransaction = transactions.find((t: Transaction) => t.id === id);
            if (updatedTransaction) {
                updateTransaction(id, { ...updatedTransaction, description: newDescription });
            }
        }
    };

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions
                    .sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((transaction: Transaction) => (
                        <li key={transaction.id}>
                            <span>{transaction.date} - {transaction.description} - €{transaction.amount}</span>
                            <button onClick={() => handleEdit(transaction.id)}>Edit</button>
                            <button onClick={() => removeTransaction(transaction.id)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TransactionList;
