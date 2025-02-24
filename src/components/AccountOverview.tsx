import React from 'react';
import { Chip, Box } from '@mui/material';
import useTransactionStore, { Transaction } from "../store/transactionStore";

const AccountOverview = () => {
    const { balance, transactions } = useTransactionStore();

    const totalIncome = transactions
        .filter((t: Transaction) => t.type === "Deposit")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t: Transaction) => t.type === "Withdrawal")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap={1}>
                <Chip label={`Balance: €${balance.toFixed(2)}`} color="primary" />
                <Chip label={`Total Income: €${totalIncome.toFixed(2)}`} color="success" />
                <Chip label={`Total Expenses: €${totalExpenses.toFixed(2)}`} color="error" />
            </Box>
        </Box>
    );
};

export default AccountOverview;
