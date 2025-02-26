import { render, screen, fireEvent } from "@testing-library/react";
import CsvHandler from "../../handlers/CsvHandler";
import { act } from "react-dom/test-utils";
import Papa from "papaparse";

// Mock the transactionStore module
jest.mock("../../store/transactionStore", () => ({
    useTransactionStore: jest.fn(),
}));

// Mock Papa.parse
jest.mock("papaparse");

describe("CsvHandler", () => {
    it("should handle file import", async () => {
        const mockAddTransaction = jest.fn();
        require("../../store/transactionStore").useTransactionStore.mockReturnValue({
            transactions: [],
            addTransaction: mockAddTransaction,
        });

        const file = new File(["Date,Amount,Description,Type\n2024-01-01,100,Salary,Deposit"], "transactions.csv", {
            type: "text/csv",
        });

        render(<CsvHandler />);

        const fileInput = screen.getByTestId("file-input");
        await act(async () => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        });

        expect(Papa.parse).toHaveBeenCalledWith(file, {
            header: true,
            complete: expect.any(Function),
            error: expect.any(Function),
        });
    });

    it("should handle file export", () => {
        const mockTransactions = [
            { id: "1", date: "2024-01-01", amount: 100, description: "Salary", type: "Deposit" },
        ];
        require("../../store/transactionStore").useTransactionStore.mockReturnValue({
            transactions: mockTransactions,
        });

        render(<CsvHandler />);

        const link = document.createElement("a");
        link.click = jest.fn();
        jest.spyOn(document, "createElement").mockReturnValue(link);

        const csvHandlerRef = { current: { handleExport: jest.fn(), handleImport: jest.fn() } };
        render(<CsvHandler ref={csvHandlerRef} />);

        act(() => {
            csvHandlerRef.current.handleExport();
        });

        expect(link.download).toBe("transactions.csv");
        expect(link.href).toContain("blob:");
    });
});