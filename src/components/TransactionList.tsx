import React, { useState } from 'react';
import {
    List,
    IconButton,
    Box,
    Typography,
    Chip,
    Card,
    CardContent,
    CardHeader,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useTransactionStore, { Transaction } from '../store/transactionStore';
import TransactionForm from './TransactionForm';

type TransactionListProps = {
    editable: boolean;
};

const TransactionList: React.FC<TransactionListProps> = ({ editable }) => {
    const { transactions, addTransaction, updateTransaction, removeTransaction } = useTransactionStore();

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

    const handleAddOpen = () => setOpenAddDialog(true);
    const handleAddClose = () => setOpenAddDialog(false);

    const handleEditOpen = (transaction: Transaction) => {
        setTransactionToEdit(transaction);
        setOpenEditDialog(true);
    };
    const handleEditClose = () => {
        setTransactionToEdit(null);
        setOpenEditDialog(false);
    };

    const handleDeleteOpen = (transaction: Transaction) => {
        setTransactionToDelete(transaction);
        setOpenDeleteDialog(true);
    };
    const handleDeleteClose = () => {
        setTransactionToDelete(null);
        setOpenDeleteDialog(false);
    };

    const handleDeleteConfirm = () => {
        if (transactionToDelete) {
            removeTransaction(transactionToDelete.id);
        }
        handleDeleteClose();
    };

    const handleAddSubmit = (transaction: Transaction) => {
        addTransaction(transaction);
        handleAddClose();
    };

    const handleEditSubmit = (updatedTransaction: Transaction) => {
        if (transactionToEdit) {
            updateTransaction(transactionToEdit.id, updatedTransaction);
        }
        handleEditClose();
    };

    return (
        <Box sx={{ padding: 2 }}>
            {editable && (
                <Button variant="contained" color="primary" onClick={handleAddOpen} sx={{ mb: 2 }}>
                    Add Transaction
                </Button>
            )}
            <List>
                {transactions
                    .sort(
                        (a: Transaction, b: Transaction) =>
                            new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((transaction: Transaction) => (
                        <Card key={transaction.id} elevation={4} sx={{ mb: 2, borderRadius: 2 }}>
                            <CardHeader
                                title={`${transaction.date} - ${transaction.description}`}
                                subheader={`€${transaction.amount}`}
                                action={
                                    <Chip
                                        label={transaction.type}
                                        color={transaction.type === 'Deposit' ? 'success' : 'error'}
                                    />
                                }
                            />
                            {editable && (
                                <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <IconButton onClick={() => handleEditOpen(transaction)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteOpen(transaction)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            )}
                        </Card>
                    ))}
            </List>

            <Dialog open={openAddDialog} onClose={handleAddClose}>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogContent>
                    <TransactionForm addTransaction={handleAddSubmit} hideSubmitButton={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" form="transactionForm" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleEditClose}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    {transactionToEdit && (
                        <TransactionForm
                            addTransaction={handleEditSubmit}
                            initialTransaction={transactionToEdit}
                            hideSubmitButton={true}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" form="transactionForm" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this transaction?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TransactionList;