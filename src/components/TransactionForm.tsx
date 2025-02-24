import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Transaction } from '../store/transactionStore';

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
    const [amount, setAmount] = useState<number>(initialTransaction ? initialTransaction.amount : 0);
    const [description, setDescription] = useState<string>(initialTransaction ? initialTransaction.description : '');
    const [type, setType] = useState<"Deposit" | "Withdrawal">(initialTransaction ? initialTransaction.type : "Deposit");

    useEffect(() => {
        if (initialTransaction) {
            setAmount(initialTransaction.amount);
            setDescription(initialTransaction.description);
            setType(initialTransaction.type);
        }
    }, [initialTransaction]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newTransaction: Transaction = {
            id: initialTransaction ? initialTransaction.id : new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            amount,
            description,
            type,
        };
        addTransaction(newTransaction);
        setAmount(0);
        setDescription('');
        setType("Deposit");
    };

    return (
        <form id="transactionForm" onSubmit={handleSubmit}>
            <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                margin="normal"
            />
            <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value as "Deposit" | "Withdrawal")}
                >
                    <MenuItem value="Deposit">Deposit</MenuItem>
                    <MenuItem value="Withdrawal">Withdrawal</MenuItem>
                </Select>
            </FormControl>
            {!hideSubmitButton && (
                <Button type="submit" variant="contained" color="primary">
                    {initialTransaction ? 'Update Transaction' : 'Add Transaction'}
                </Button>
            )}
        </form>
    );
};

export default TransactionForm;