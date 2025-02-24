import React from 'react';
import { Typography, Box } from '@mui/material';
import TransactionList from '../components/TransactionList';

const TransactionPage = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Manage Transactions
            </Typography>
            <TransactionList editable={true} />
        </Box>
    );
};

export default TransactionPage;