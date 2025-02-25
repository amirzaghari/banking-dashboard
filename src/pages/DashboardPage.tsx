import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Collapse, Button, Typography, Toolbar } from "@mui/material";
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
        <div style={{ margin: theme.spacing(1) }}>
            <Toolbar />

            {/* Main Container */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on mobile, row on larger screens
                    gap: 3,
                    width: '100%',
                }}
            >
                {/* Account Overview Section */}
                <Box
                    sx={{
                        flex: { xs: 1, sm: 0.4 }, // Full width on mobile, 40% on larger screens
                        width: '100%',
                    }}
                >
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

                {/* Transaction History Section */}
                <Box
                    sx={{
                        flex: 1, // Full width on mobile, remaining space on larger screens
                        width: '100%',
                    }}
                >
                    <Card elevation={3}>
                        <CardHeader
                            title={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                    sx={{ flexDirection: { xs: 'column', sm: 'row' } }} // Stack vertically on mobile, row on larger screens
                                >
                                    <Typography variant="h6">Transaction History</Typography>
                                    <Button component={Link} to="/transactions" sx={{ textTransform: "none" }}>
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