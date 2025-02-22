import { useState } from "react";
import useTransactionStore from "../store/transactionStore";

const TransactionForm = () => {
    const { addTransaction } = useTransactionStore();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"Deposit" | "Withdrawal">("Deposit");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !description) return;

        const transaction = {
            id: Date.now().toString(),
            amount: parseFloat(amount),
            description,
            date: new Date().toISOString().split("T")[0],
            type,
        };

        addTransaction(transaction);
        setAmount("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value as any)}>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
            </select>
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
