import Papa from "papaparse";
import useTransactionStore, { Transaction } from "../store/transactionStore";

const CsvHandler = () => {
    const { transactions, addTransaction } = useTransactionStore();

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

        Papa.parse(file, {
            complete: (result) => {
                const parsedTransactions = result.data as string[][];
                parsedTransactions.shift(); // Remove header

                parsedTransactions.forEach((row) => {
                    const [date, amount, description, type] = row;
                    if (!date || !amount || !description || !type) return;

                    addTransaction({
                        id: Date.now().toString(),
                        date,
                        amount: parseFloat(amount),
                        description,
                        type: type as "Deposit" | "Withdrawal",
                    });
                });
            },
            header: true,
        });
    };

    return (
        <div>
            <h2>CSV Import/Export</h2>
            <label htmlFor="file-upload">Upload CSV</label>
            <input id="file-upload" type="file"/>
            <button onClick={handleExport}>Export CSV</button>
        </div>
    );
};

export default CsvHandler;
