import React from 'react';
import { Chip, Box, CircularProgress } from '@mui/material';
import useTransactionStore from '../store/transactionStore';
import { useCurrency } from '../context/CurrencyContext';

const AccountOverview = () => {
    const { balance, transactions } = useTransactionStore();
    const { convert, getCurrencySymbol, loading } = useCurrency();

    const totalIncome = transactions
        .filter((t) => t.type === 'Deposit')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === 'Withdrawal')
        .reduce((sum, t) => sum + t.amount, 0);

    const currencySymbol = getCurrencySymbol();

    if (loading) {
        return (
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 5 }}>
            <Box display="flex" flexDirection="column" gap={1}>
                <Chip label={`Balance: ${currencySymbol} ${convert(balance).toFixed(2)}`} color="primary" />
                <Chip label={`Total Income: ${currencySymbol} ${convert(totalIncome).toFixed(2)}`} color="success" />
                <Chip label={`Total Expenses: ${currencySymbol} ${convert(totalExpenses).toFixed(2)}`} color="error" />
            </Box>
        </Box>
    );
};

export default AccountOverview;