import React, { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Alert';
import * as defaultRates from './rates.json';

function App({ currentRates }) {
  const rates = currentRates || defaultRates;
  const currencies = Object.keys(rates.data).map((k) => {
    return {
      value: k,
      label: k,
    };
  });

  let [conversion, setConversion] = useState(0);
  let [amount, setAmount] = useState(0);
  let [targetSymbol, setTargetSymbol] = useState('MXN');
  let [targetRate, setTargetRate] = useState(0);

  const convert = (value: number) => {
    amount = value;
    setAmount(amount);
    targetRate = rates.data[targetSymbol];
    setTargetRate(targetRate);
    conversion = +(value * targetRate).toFixed(2);
    setConversion(conversion);
  };

  const changeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    targetSymbol = event.target.value;
    setTargetSymbol(targetSymbol);
    convert(amount);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    convert(parseFloat(event.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        {!currentRates ? (
          <Alert severity="warning">
            <i>API unavailable, Using historical rates!</i>
          </Alert>
        ) : (
          ''
        )}
        <h1>$Converter</h1>
        <div>
          <TextField
            type="number"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            id="standard-basic"
            label="Dollar amount $"
            variant="standard"
            onChange={changeAmount}
          />
        </div>
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            defaultValue={targetSymbol}
            helperText="Please select your currency"
            variant="standard"
            onChange={changeCurrency}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {conversion ? (
          <Alert id="output" severity="info">
            {conversion} {targetSymbol}
          </Alert>
        ) : (
          ''
        )}
      </header>
    </div>
  );
}

export default App;
