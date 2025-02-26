import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";
import Layout from "./components/Layout";
import "./App.css";
import ImportExportPage from "./pages/ImportExportPage";
import { CurrencyProvider } from "./context/CurrencyContext";

const App: React.FC = () => {
    return (
        <CurrencyProvider>
            <Router>
                <div className="app">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/transactions" element={<TransactionPage />} />
                            <Route path="/import-export" element={<ImportExportPage />} />
                        </Routes>
                    </Layout>
                </div>
            </Router>
        </CurrencyProvider>
    );
};

export default App;