import ky from 'ky';

const API_URL = 'https://api.frankfurter.app/latest';

interface CurrencyRates {
    [key: string]: number;
}

interface ExchangeRateResponse {
    rates: CurrencyRates;
}

let exchangeRates: CurrencyRates = {};
let baseCurrency = 'EUR';

const currencySymbols: { [key: string]: string } = {
    EUR: '€',
    USD: '$',
    GBP: '£',
};

export const CurrencyHandler = {
    async fetchExchangeRates(targetCurrency: string) {
        if (targetCurrency === baseCurrency) {
            exchangeRates = { [targetCurrency]: 1 };
            return exchangeRates;
        }

        try {
            const data = await ky.get(`${API_URL}?from=${baseCurrency}&to=${targetCurrency}`).json<ExchangeRateResponse>();
            exchangeRates = data.rates;
            return exchangeRates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Fallback to base currency if the API call fails
            exchangeRates = { [targetCurrency]: 1 };
            return exchangeRates;
        }
    },

    convert(amount: number, targetCurrency: string): number {
        if (!exchangeRates[targetCurrency]) {
            console.warn(`Exchange rate for ${targetCurrency} not found. Using base currency (${baseCurrency}).`);
            return amount;
        }
        return amount * exchangeRates[targetCurrency];
    },

    getCurrencySymbol(currencyCode: string): string {
        return currencySymbols[currencyCode] || currencyCode;
    },

    setBaseCurrency(currency: string) {
        baseCurrency = currency;
    },

    getBaseCurrency(): string {
        return baseCurrency;
    },
};