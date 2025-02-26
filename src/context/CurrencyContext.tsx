import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyHandler } from '../handlers/CurrencyHandler';

interface CurrencyContextType {
    currency: string;
    setCurrency: (currency: string) => void;
    convert: (amount: number) => number;
    getCurrencySymbol: () => string;
    loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<string>('EUR');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                await CurrencyHandler.fetchExchangeRates(currency);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [currency]);

    const convert = (amount: number): number => {
        try {
            return CurrencyHandler.convert(amount, currency);
        } catch (error) {
            console.error('Error converting currency:', error);
            return amount;
        }
    };

    const getCurrencySymbol = (): string => {
        return CurrencyHandler.getCurrencySymbol(currency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convert, getCurrencySymbol, loading }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};