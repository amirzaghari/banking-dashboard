import useTransactionStore, {Transaction} from "../store/transactionStore";

const AccountOverview = () => {
    const { balance, transactions } = useTransactionStore();

    const totalIncome = transactions
        .filter((t: Transaction) => t.type === "Deposit")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t: Transaction) => t.type === "Withdrawal")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    return (
        <div>
            <h2>Account Overview</h2>
            <p>Balance: €{balance.toFixed(2)}</p>
            <p>Total Income: €{totalIncome.toFixed(2)}</p>
            <p>Total Expenses: €{totalExpenses.toFixed(2)}</p>
        </div>
    );
};

export default AccountOverview;
