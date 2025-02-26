import { act } from "react-dom/test-utils";
import useTransactionStore from "../../store/transactionStore";

describe("transactionStore", () => {
    it("should add a transaction", () => {
        const { addTransaction, transactions } = useTransactionStore.getState();

        act(() => {
            addTransaction({
                id: "1",
                date: "2024-01-01",
                amount: 100,
                description: "Salary",
                type: "Deposit",
            });
        });

        expect(transactions.length).toBe(1);
        expect(transactions[0].description).toBe("Salary");
    });

    it("should remove a transaction", () => {
        const { addTransaction, removeTransaction, transactions } = useTransactionStore.getState();

        act(() => {
            addTransaction({
                id: "1",
                date: "2024-01-01",
                amount: 100,
                description: "Salary",
                type: "Deposit",
            });
            removeTransaction("1");
        });

        expect(transactions.length).toBe(0);
    });

    it("should update a transaction", () => {
        const { addTransaction, updateTransaction, transactions } = useTransactionStore.getState();

        act(() => {
            addTransaction({
                id: "1",
                date: "2024-01-01",
                amount: 100,
                description: "Salary",
                type: "Deposit",
            });
            updateTransaction("1", {
                id: "1",
                date: "2024-01-01",
                amount: 200,
                description: "Bonus",
                type: "Deposit",
            });
        });

        expect(transactions[0].amount).toBe(200);
        expect(transactions[0].description).toBe("Bonus");
    });
});