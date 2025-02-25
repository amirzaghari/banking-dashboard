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
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Pagination,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useTransactionStore, { Transaction } from '../store/transactionStore';
import TransactionForm from '../forms/TransactionForm';

const itemsPerPage = 20;

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
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [page, setPage] = useState(1);

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

    const filteredTransactions = transactions
        .filter(t => (filterType === 'All' || t.type === filterType))
        .filter(t => (!searchTerm || t.description.toLowerCase().includes(searchTerm.toLowerCase())))
        .filter(t => (!dateFrom || new Date(t.date) >= new Date(dateFrom)))
        .filter(t => (!dateTo || new Date(t.date) <= new Date(dateTo)))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const paginatedTransactions = filteredTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ padding: 2 }}>
            {editable && (
                <Button variant="contained" color="primary" onClick={handleAddOpen} sx={{ mb: 2 }}>
                    Add Transaction
                </Button>
            )}

            {/* Search and Filter Section */}
            <Box sx={{ mb: 2 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }} // Stack vertically on mobile, horizontally on larger screens
                    spacing={2}
                >
                    <Box sx={{ flex: 1 }}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="Search"
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={filterType}
                                onChange={e => setFilterType(e.target.value)}
                                label="Type"
                            >
                                <MenuItem value="All">All Transactions</MenuItem>
                                <MenuItem value="Deposit">Only Deposits</MenuItem>
                                <MenuItem value="Withdrawal">Only Withdrawals</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="From"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={dateFrom}
                                onChange={e => setDateFrom(e.target.value)}
                                fullWidth
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="To"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={dateTo}
                                onChange={e => setDateTo(e.target.value)}
                                fullWidth
                            />
                        </FormControl>
                    </Box>
                </Stack>
            </Box>

            {/* Transaction List */}
            <List>
                {paginatedTransactions.map(transaction => (
                    <Card key={transaction.id} elevation={3} sx={{ mb: 1, borderRadius: 2, py: 1, px: 2 }}>
                        <CardHeader
                            title={
                                <Typography variant="body2" color="textSecondary">
                                    {transaction.date} - {transaction.description}
                                </Typography>
                            }
                            subheader={
                                <Typography variant="h6" fontWeight="bold">
                                    €{transaction.amount}
                                </Typography>
                            }
                            action={
                                <Chip label={transaction.type} color={transaction.type === 'Deposit' ? 'success' : 'error'} size="small" />
                            }
                        />
                        {editable && (
                            <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 0 }}>
                                <IconButton size="small" onClick={() => handleEditOpen(transaction)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDeleteOpen(transaction)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </List>

            {/* Pagination */}
            <Pagination
                count={Math.ceil(filteredTransactions.length / itemsPerPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                sx={{ mt: 2 }}
            />

            {/* Dialogs */}
            <Dialog open={openAddDialog} onClose={handleAddClose}>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogContent>
                    <TransactionForm addTransaction={handleAddSubmit} hideSubmitButton={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">Cancel</Button>
                    <Button type="submit" form="transactionForm" color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleEditClose}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    {transactionToEdit && (
                        <TransactionForm
                            addTransaction={handleEditSubmit}
                            hideSubmitButton={false}
                            initialTransaction={transactionToEdit}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">Cancel</Button>
                    <Button type="submit" form="transactionForm" color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
                <DialogTitle>Delete Transaction</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this transaction?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TransactionList;