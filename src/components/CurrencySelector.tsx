import React from 'react';
import {MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Box} from '@mui/material';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = () => {
    const { currency, setCurrency } = useCurrency();

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCurrency(event.target.value);
    };

    return (
        <Box sx={{mt: 2, transform: 'scale(0.8)', transformOrigin: 'left top'}} >
            <FormControl>
                <InputLabel>Currency</InputLabel>
                <Select value={currency} onChange={handleChange} label="Currency">
                    <MenuItem value="EUR">€ (EUR)</MenuItem>
                    <MenuItem value="USD">$ (USD)</MenuItem>
                    <MenuItem value="GBP">£ (GBP)</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default CurrencySelector;