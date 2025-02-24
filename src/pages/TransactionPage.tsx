import React from 'react';
import {Typography, Box, Container} from '@mui/material';
import TransactionList from '../components/TransactionList';

const TransactionPage = () => {
    return (
        <Container maxWidth="xl" sx={{mt: 5}}>
            <Box sx={{padding: 2}}>
                <Typography variant="h4" gutterBottom>
                    Manage Transactions
                </Typography>
                <TransactionList editable={true}/>
            </Box>
        </Container>
    );
};

export default TransactionPage;