
# Banking Dashboard

This is a modern banking dashboard application that allows users to manage their transactions, view their financial data, change currency, and track their balance and expenses through an intuitive interface. The dashboard supports both **dark** and **light** modes and is built with a mobile-first design approach.

## Features

- **Manage Transactions**: Add, update, remove transactions with detailed information (amount, description, type, etc.)
- **Transaction Filters & Search**: Filter and search transactions by various parameters such as amount, type (deposit/withdrawal), description, etc.
- **Export and Import Transactions**: Export and import transaction as a .csv file
- **Currency Selector**: Change the currency used for transaction amounts and display the balance in the selected currency.
- **Charts**: Visual representation of financial data, including balance, total income, and total expenses.
- **Dark Mode / Light Mode**: Switch between dark and light themes to match your preferences.
- **Mobile-First Design**: The app is fully responsive and optimized for mobile devices.

## Technologies Used

- **React**: For building the user interface
- **Zustand**: For state management
- **Chart.js**: For visualizing financial data in charts
- **Styled-components**: For theming and styling
- **Jest**: For unit testing
- **React Context API**: For managing and providing global state, like currency selection

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/amirzaghari/banking-dashboard
    ```

2. Navigate to the project folder:
    ```bash
    cd banking-dashboard
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

## Running the Project

Once the dependencies are installed, you can run the application locally:

```bash
npm start
```

This will start the development server and open the application in your browser at `http://localhost:3000`.

## Running Tests

To run the tests, navigate to the `src/tests` directory and execute the following command:

```bash
npm test
```

This will run all tests and display the results in your terminal.

## Folder Structure

The project folder is organized as follows:

```
public
src
  components
    AccountOverview.tsx
    AccountOverviewChart.tsx
    CurrencySelector.tsx
    Layout.tsx
    Navigation.tsx
    TransactionList.tsx
  context
    CurrencyContext.tsx
  forms
    TransactionForm.tsx
  handlers
    CsvHandler.tsx
    CurrencyHandler.tsx
  hooks
    useTransactions.ts
  pages
    DashboardPage.tsx
    ImportExportPage.tsx
    TransactionPage.tsx
  store
    transactionStore.ts
```

## Contributing

Feel free to fork this repository and submit pull requests for any improvements or bug fixes. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- React: A JavaScript library for building user interfaces.
- Zustand: A minimalistic state management library for React.
- Chart.js: A simple and flexible charting library.
