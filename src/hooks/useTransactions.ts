import useTransactionStore from '../store/transactionStore';

const useTransactions = () => {
    const { transactions } = useTransactionStore();
    return transactions;
};

export default useTransactions;