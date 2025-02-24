import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import useTransactionStore, { Transaction } from '../store/transactionStore';
import { useTheme } from '@mui/material/styles';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const AccountOverviewChart = () => {
    const theme = useTheme();
    const { balance, transactions } = useTransactionStore();

    const totalIncome = transactions
        .filter((t: Transaction) => t.type === "Deposit")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t: Transaction) => t.type === "Withdrawal")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const data = {
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [
            {
                data: [totalIncome, totalExpenses, balance],
                backgroundColor: [
                    theme.palette.success.main,
                    theme.palette.error.main,
                    theme.palette.primary.main,
                ],
                borderColor: ['#ffffff', '#ffffff', '#ffffff'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: 200, width: '100%' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default AccountOverviewChart;
