import React, { useRef } from "react";
import { Container, Typography, Box, Button, Paper, Alert, Stack } from "@mui/material";
import CsvHandler, { CsvHandlerRef } from "../components/CsvHandler"; // Ensure CsvHandler is imported
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImportExportPage = () => {
    const csvHandlerRef = useRef<CsvHandlerRef | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleExport = () => {
        if (csvHandlerRef.current) {
            csvHandlerRef.current.handleExport();
        }
    };

    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                    Import / Export Transactions
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                    Manage your transactions by importing or exporting them as CSV files. Ensure the CSV file follows the
                    correct format:
                    <br />
                    <strong>Date, Amount, Description, Type</strong>
                </Typography>

                <Box sx={{ width: "100%" }}>
                    <Stack spacing={4}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h6" component="h2" gutterBottom align="center">
                                Import Transactions
                            </Typography>
                            <Typography variant="body2" paragraph align="center" sx={{ mb: 3 }}>
                                Upload a CSV file to add transactions to your account.
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <input
                                    type="file"
                                    accept=".csv"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        if (csvHandlerRef.current) {
                                            csvHandlerRef.current.handleImport(e);
                                        }
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudUploadIcon />}
                                    onClick={handleFileUploadClick}
                                >
                                    Upload CSV
                                </Button>
                            </Box>
                            <CsvHandler ref={csvHandlerRef} /> {/* Add CsvHandler here */}
                        </Paper>

                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h6" component="h2" gutterBottom align="center">
                                Export Transactions
                            </Typography>
                            <Typography variant="body2" paragraph align="center" sx={{ mb: 3 }}>
                                Download all your transactions as a CSV file.
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <Button variant="contained" color="primary" onClick={handleExport}>
                                    Export CSV
                                </Button>
                            </Box>
                        </Paper>
                    </Stack>
                </Box>

                <Box mt={4}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                            <strong>Note:</strong> The CSV file must have the following columns in order:
                            <br />
                            <code>Date, Amount, Description, Type</code>
                        </Typography>
                    </Alert>
                    <Alert severity="warning">
                        <Typography variant="body2">
                            <strong>Warning:</strong> Duplicate transactions will be ignored during import.
                        </Typography>
                    </Alert>
                </Box>
            </Paper>
        </Container>
    );
};

export default ImportExportPage;