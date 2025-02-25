import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";
import Layout from "./components/Layout";
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Layout>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/transactions" element={<TransactionPage />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
};

export default App;
