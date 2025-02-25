import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Transaction } from '../store/transactionStore';
import useTransactionStore from '../store/transactionStore';

export type TransactionFormProps = {
    addTransaction: (transaction: Transaction) => void;
    initialTransaction?: Transaction;
    hideSubmitButton?: boolean;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
                                                             addTransaction,
                                                             initialTransaction,
                                                             hideSubmitButton = false,
                                                         }) => {
    const { balance } = useTransactionStore();
    const [amount, setAmount] = useState<number>(initialTransaction ? initialTransaction.amount : 0);
    const [description, setDescription] = useState<string>(initialTransaction ? initialTransaction.description : '');
    const [type, setType] = useState<"Deposit" | "Withdrawal">(initialTransaction ? initialTransaction.type : "Deposit");
    const [date, setDate] = useState<string>(initialTransaction ? initialTransaction.date : new Date().toISOString().split('T')[0]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (initialTransaction) {
            setAmount(initialTransaction.amount);
            setDescription(initialTransaction.description);
            setType(initialTransaction.type);
            setDate(initialTransaction.date);
        }
    }, [initialTransaction]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!description.trim()) {
            setError("Description cannot be empty.");
            return;
        }

        if (amount <= 0) {
            setError("Amount must be greater than zero.");
            return;
        }

        if (type === "Withdrawal" && amount > balance) {
            setError("Insufficient balance for withdrawal.");
            return;
        }

        const newTransaction: Transaction = {
            id: initialTransaction ? initialTransaction.id : new Date().toISOString(),
            date,
            amount: type === "Deposit" ? amount : -Math.abs(amount),
            description,
            type,
        };

        addTransaction(newTransaction);
        setAmount(0);
        setDescription('');
        setType("Deposit");
        setDate(new Date().toISOString().split('T')[0]);
        setError('');
    };

    return (
        <form id="transactionForm" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                    label="Amount"
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value as "Deposit" | "Withdrawal")}
                    label="Type"
                    variant="outlined"
                >
                    <MenuItem value="Deposit">Deposit</MenuItem>
                    <MenuItem value="Withdrawal">Withdrawal</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </FormControl>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!hideSubmitButton && (
                <Button type="submit" variant="contained" color="primary">
                    {initialTransaction ? 'Update Transaction' : 'Add Transaction'}
                </Button>
            )}
        </form>
    );
};

export default TransactionForm;
