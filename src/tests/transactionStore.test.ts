import useTransactionStore from "../store/transactionStore";

beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
});

describe("Transaction Store", () => {
    it("should add a transaction", () => {
        const store = useTransactionStore.getState();
        store.addTransaction({
            id: "1",
            date: "2024-02-01",
            amount: 100,
            description: "Salary",
            type: "Deposit",
        });

        expect(store.transactions.length).toBe(1);
        expect(store.transactions[0].description).toBe("Salary");
        expect(store.balance).toBe(100);
    });

    it("should remove a transaction", () => {
        const store = useTransactionStore.getState();
        store.addTransaction({
            id: "1",
            date: "2024-02-01",
            amount: 100,
            description: "Salary",
            type: "Deposit",
        });

        store.removeTransaction("1");

        expect(store.transactions.length).toBe(0);
        expect(store.balance).toBe(0);
    });
});
