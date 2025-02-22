import React from 'react';
import AccountOverview from '../components/AccountOverview';
import TransactionList from '../components/TransactionList';

const DashboardPage = () => {
    return (
        <div>
            <AccountOverview />
            <TransactionList />
        </div>
    );
};

export default DashboardPage;