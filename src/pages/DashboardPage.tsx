import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Collapse, Button, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from 'react-router-dom';
import AccountOverviewChart from "../components/AccountOverviewChart";
import AccountOverview from "../components/AccountOverview";
import TransactionList from "../components/TransactionList";

const DashboardPage = () => {
    const theme = useTheme();
    const [accountOverviewOpen, setAccountOverviewOpen] = useState(true);
    const [transactionHistoryOpen, setTransactionHistoryOpen] = useState(true);

    const toggleAccountOverview = () => setAccountOverviewOpen(!accountOverviewOpen);
    const toggleTransactionHistory = () => setTransactionHistoryOpen(!transactionHistoryOpen);

    return (
        <div style={{ margin: theme.spacing(2) }}>
            <Box display="flex" flexWrap="wrap" gap={3} justifyContent="space-between">
                <Box flex={1}>
                    <Card elevation={3}>
                        <CardHeader
                            title="Account Overview"
                            action={
                                <IconButton onClick={toggleAccountOverview}>
                                    {accountOverviewOpen ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            }
                        />
                        <Collapse in={accountOverviewOpen}>
                            <CardContent>
                                <AccountOverviewChart />
                                <AccountOverview />
                            </CardContent>
                        </Collapse>
                    </Card>
                </Box>
                <Box flex={1}>
                    <Card elevation={3}>
                        <CardHeader
                            title={
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                    <Typography variant="h6">Transaction History</Typography>
                                    <Button component={Link} to="/transactions" variant="text">
                                        Manage transactions
                                    </Button>
                                </Box>
                            }
                            action={
                                <IconButton onClick={toggleTransactionHistory}>
                                    {transactionHistoryOpen ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            }
                        />
                        <Collapse in={transactionHistoryOpen}>
                            <CardContent>
                                <TransactionList editable={false} />
                            </CardContent>
                        </Collapse>
                    </Card>
                </Box>
            </Box>
        </div>
    );
};

export default DashboardPage;