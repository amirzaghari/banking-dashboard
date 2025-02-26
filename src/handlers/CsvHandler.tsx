import React, { useImperativeHandle, forwardRef } from "react";
import Papa from "papaparse";
import useTransactionStore, { Transaction } from "../store/transactionStore";

interface CsvHandlerProps {}

export interface CsvHandlerRef {
    handleExport: () => void;
    handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CsvHandler = forwardRef<CsvHandlerRef, CsvHandlerProps>((props, ref) => {
    const { transactions, addTransaction } = useTransactionStore();
    const [error, setError] = React.useState<string | null>(null);

    const handleExport = () => {
        const csvData = transactions.map((t: Transaction) => ({
            Date: t.date,
            Amount: t.amount,
            Description: t.description,
            Type: t.type,
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        link.click();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        Papa.parse(file, {
            header: true,
            complete: (result) => {
                const parsedTransactions = result.data as any[];
                const newTransactions: Transaction[] = [];

                parsedTransactions.forEach((row, index) => {
                    const { Date, Amount, Description, Type } = row;

                    if (!Date || !Amount || !Description || !Type) {
                        setError(`Row ${index + 1} is missing required fields.`);
                        return;
                    }

                    const amount = parseFloat(Amount);
                    if (isNaN(amount)) {
                        setError(`Row ${index + 1} has an invalid amount.`);
                        return;
                    }

                    if (Type !== "Deposit" && Type !== "Withdrawal") {
                        setError(`Row ${index + 1} has an invalid transaction type.`);
                        return;
                    }

                    const isDuplicate = transactions.some(
                        (t) =>
                            t.date === Date &&
                            t.amount === amount &&
                            t.description === Description &&
                            t.type === Type
                    );

                    if (isDuplicate) {
                        setError(`Row ${index + 1} is a duplicate transaction.`);
                        return;
                    }

                    newTransactions.push({
                        id: Date.now().toString(),
                        date: Date,
                        amount,
                        description: Description,
                        type: Type as "Deposit" | "Withdrawal",
                    });
                });

                if (newTransactions.length > 0) {
                    newTransactions.forEach((t) => addTransaction(t));
                }
            },
            error: (err) => {
                setError("Failed to parse the CSV file. Please check the file format.");
            },
        });
    };

    useImperativeHandle(ref, () => ({
        handleExport,
        handleImport,
    }));

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
});

export default CsvHandler;