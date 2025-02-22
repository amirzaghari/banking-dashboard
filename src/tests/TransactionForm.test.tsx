import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "../components/TransactionForm";
import useTransactionStore from "../store/transactionStore";

jest.mock("../store/transactionStore", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        addTransaction: jest.fn(),
    })),
}));

describe("Transaction Form", () => {
    it("should add a new transaction", () => {
        render(<TransactionForm />);

        fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "100" } });
        fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Salary" } });
        fireEvent.click(screen.getByText("Add Transaction"));

        expect(useTransactionStore().addTransaction).toHaveBeenCalled();
    });

    it("should prevent submission if fields are empty", () => {
        render(<TransactionForm />);
        fireEvent.click(screen.getByText("Add Transaction"));

        expect(useTransactionStore().addTransaction).not.toHaveBeenCalled();
    });
});
