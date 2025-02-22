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
    addTransaction: (transaction: Transaction) => void;
    removeTransaction: (id: string) => void;
    undoTransaction: () => void;
    updateTransaction: (id: string, updatedTransaction: Transaction) => void;
};

const useTransactionStore = create<TransactionStore>((set, get) => ({
    transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
    balance: JSON.parse(localStorage.getItem("balance") || "0"),

    addTransaction: (transaction: Transaction) => {
        const updatedTransactions = [...get().transactions, transaction];
        const newBalance =
            transaction.type === "Deposit"
                ? get().balance + transaction.amount
                : get().balance - transaction.amount;

        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        localStorage.setItem("balance", JSON.stringify(newBalance));

        set({ transactions: updatedTransactions, balance: newBalance });
    },

    removeTransaction: (id) => {
        const updatedTransactions = get().transactions.filter((t) => t.id !== id);
        const newBalance = updatedTransactions.reduce(
            (sum, t) => (t.type === "Deposit" ? sum + t.amount : sum - t.amount),
            0
        );

        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        localStorage.setItem("balance", JSON.stringify(newBalance));

        set({ transactions: updatedTransactions, balance: newBalance });
    },

    undoTransaction: () => {
        const prevTransactions = get().transactions.slice(0, -1);
        const newBalance = prevTransactions.reduce(
            (sum, t) => (t.type === "Deposit" ? sum + t.amount : sum - t.amount),
            0
        );

        localStorage.setItem("transactions", JSON.stringify(prevTransactions));
        localStorage.setItem("balance", JSON.stringify(newBalance));

        set({ transactions: prevTransactions, balance: newBalance });
    },

    updateTransaction: (id, updatedTransaction) => {
        const updatedTransactions = get().transactions.map((t) =>
            t.id === id ? updatedTransaction : t
        );
        const newBalance = updatedTransactions.reduce(
            (sum, t) => (t.type === "Deposit" ? sum + t.amount : sum - t.amount),
            0
        );

        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        localStorage.setItem("balance", JSON.stringify(newBalance));

        set({ transactions: updatedTransactions, balance: newBalance });
    },
}));

export default useTransactionStore;
