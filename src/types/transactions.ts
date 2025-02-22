export type Transaction = {
    id: string;
    date: string;
    amount: number;
    description: string;
    type: "Deposit" | "Withdrawal";
};