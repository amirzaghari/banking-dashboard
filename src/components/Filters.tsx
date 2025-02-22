import { useState } from "react";
import useTransactionStore, {Transaction} from "../store/transactionStore";

const Filters = () => {
    const { transactions } = useTransactionStore();
    const [type, setType] = useState<"All" | "Deposit" | "Withdrawal">("All");
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const filteredTransactions = transactions.filter((t: Transaction) => {
        return (
            (type === "All" || t.type === type) &&
            (search === "" || t.description.toLowerCase().includes(search.toLowerCase())) &&
            (!fromDate || new Date(t.date) >= new Date(fromDate)) &&
            (!toDate || new Date(t.date) <= new Date(toDate))
        );
    });

    return (
        <div>
            <h2>Filters</h2>
            <input type="text" placeholder="Search description" value={search} onChange={(e) => setSearch(e.target.value)} />
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value as any)}>
                <option value="All">All Transactions</option>
                <option value="Deposit">Deposits</option>
                <option value="Withdrawal">Withdrawals</option>
            </select>
            <ul>
                {filteredTransactions.map((t: Transaction) => (
                    <li key={t.id}>{t.date} - {t.description} - €{t.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default Filters;
