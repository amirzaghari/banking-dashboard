import { create } from "zustand";

export type Transaction = {
    id: string;
    date: string;
    amount: number;
    description: string;
    type: "Deposit" | "Withdrawal";
};

type TransactionStore = {
    transactions: Transaction[];
    balance: number;
    history: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    removeTransaction: (id: string) => void;
    undoTransaction: () => void;
    updateTransaction: (id: string, updatedTransaction: Transaction) => void;
};

const defaultTransactions: Transaction[] = [
    { id: "1", date: "2024-01-01", amount: 500, description: "Salary", type: "Deposit" },
    { id: "2", date: "2024-01-05", amount: 200, description: "Groceries", type: "Withdrawal" },
    { id: "3", date: "2024-01-10", amount: 100, description: "Electricity Bill", type: "Withdrawal" },
];

const getInitialTransactions = (): Transaction[] => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "null");
    return storedTransactions && storedTransactions.length > 0 ? storedTransactions : defaultTransactions;
};

const calculateBalance = (transactions: Transaction[]): number =>
    transactions.reduce((sum, t) => (t.type === "Deposit" ? sum + t.amount : sum - t.amount), 0);

const saveToLocalStorage = (transactions: Transaction[], balance: number) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("balance", JSON.stringify(balance));
};

const useTransactionStore = create<TransactionStore>((set, get) => {
    const initialTransactions = getInitialTransactions();
    const initialBalance = calculateBalance(initialTransactions);

    // Save default transactions to localStorage if they weren't there
    if (!localStorage.getItem("transactions")) {
        saveToLocalStorage(initialTransactions, initialBalance);
    }

    return {
        transactions: initialTransactions,
        balance: initialBalance,
        history: [],

        addTransaction: (transaction) => {
            const updatedTransactions = [...get().transactions, transaction];
            const newBalance = calculateBalance(updatedTransactions);

            saveToLocalStorage(updatedTransactions, newBalance);
            set({ transactions: updatedTransactions, balance: newBalance });
        },

        removeTransaction: (id) => {
            const { transactions, history } = get();
            const transactionToRemove = transactions.find((t) => t.id === id);
            if (!transactionToRemove) return;

            const updatedTransactions = transactions.filter((t) => t.id !== id);
            const newBalance = calculateBalance(updatedTransactions);

            saveToLocalStorage(updatedTransactions, newBalance);
            set({ transactions: updatedTransactions, balance: newBalance, history: [transactionToRemove, ...history] });
        },

        undoTransaction: () => {
            const { transactions, history } = get();
            if (history.length === 0) return;

            const lastDeleted = history[0];
            const updatedTransactions = [...transactions, lastDeleted];
            const newBalance = calculateBalance(updatedTransactions);

            saveToLocalStorage(updatedTransactions, newBalance);
            set({ transactions: updatedTransactions, balance: newBalance, history: history.slice(1) });
        },

        updateTransaction: (id, updatedTransaction) => {
            const updatedTransactions = get().transactions.map((t) =>
                t.id === id ? updatedTransaction : t
            );
            const newBalance = calculateBalance(updatedTransactions);

            saveToLocalStorage(updatedTransactions, newBalance);
            set({ transactions: updatedTransactions, balance: newBalance });
        },
    };
});

export default useTransactionStore;
