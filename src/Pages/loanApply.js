import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Paper, InputLabel, Select, FormControl, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  background: '#f9f9f9',
  width: '100%',
  maxWidth: '600px',
  margin: '20px auto',
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
  },
}));

const LoanApply = () => {
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState(100000); // Default value set to ₹1 lakh
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState('');
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  // Loan interest rates based on loan type
  const loanInterestRates = {
    "House Loan": 9.5,
    "Gold Loan": 8.25,
    "Automobile Loan": 9.9,
    "Personal Loan": 12,
    "Agricultural Loan": 8.5,
  };

  // Function to calculate EMI based on loan amount, interest rate, and tenure
  const calculateEmi = (amount, rate, tenureInYears) => {
    const annualInterestRate = rate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numMonths = tenureInYears * 12; // converting years to months
    const emiValue = (amount * monthlyInterestRate * (1 + monthlyInterestRate) ** numMonths) / ((1 + monthlyInterestRate) ** numMonths - 1);
    return emiValue.toFixed(2); // returning EMI with 2 decimal points
  };

  const handleLoanAmountChange = (e) => {
    const amount = e.target.value;
    if (amount >= 100000 && amount <= 50000000) {
      setLoanAmount(amount);
      if (loanType && tenure) {
        const calculatedEmi = calculateEmi(amount, loanInterestRates[loanType], tenure);
        setEmi(calculatedEmi);
      }
    } else {
      alert('Loan amount must be between ₹1 lakh and ₹5 crore.');
    }
  };

  const handleTenureChange = (e) => {
    const selectedTenure = e.target.value;
    setTenure(selectedTenure);
    if (loanAmount && loanType) {
      const calculatedEmi = calculateEmi(loanAmount, loanInterestRates[loanType], selectedTenure);
      setEmi(calculatedEmi);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const customerId = sessionStorage.getItem('customerId');
    const formData = new FormData();
    formData.append('loanType', loanType);
    formData.append('loanAmount', loanAmount);
    formData.append('tenure', tenure);
    formData.append('emi', emi);
    formData.append('document', document);
    formData.append('customerId', customerId);

    try {
      await axios.post(
        'https://firestore.googleapis.com/v1/projects/bank-management-cde77/databases/(default)/documents/loan',
        formData
      );
      alert('Loan application submitted successfully.');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('Failed to submit loan application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold', color: '#1e90ff' }}>
        Apply for Loan
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Loan Type</InputLabel>
          <Select
            value={loanType}
            onChange={(e) => {
              setLoanType(e.target.value);
              if (loanAmount && tenure) {
                const calculatedEmi = calculateEmi(loanAmount, loanInterestRates[e.target.value], tenure);
                setEmi(calculatedEmi);
              }
            }}
            label="Loan Type"
            required
          >
            {Object.entries(loanInterestRates).map(([type, rate]) => (
              <MenuItem key={type} value={type}>
                {type} (Interest Rate: {rate}%)
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Loan Amount (₹)"
          variant="outlined"
          fullWidth
          value={loanAmount}
          onChange={handleLoanAmountChange}
          required
          type="number"
          style={{ marginBottom: '20px' }}
          inputProps={{ min: 100000, max: 50000000 }}
        />

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel style={{ top: '0px' }}>Choose Tenure (Years)</InputLabel>
          <Select
            value={tenure}
            onChange={handleTenureChange}
            label="Choose Tenure (Years)"
            required
          >
            <MenuItem value={1}>1 Year</MenuItem>
            <MenuItem value={2}>2 Years</MenuItem>
            <MenuItem value={3}>3 Years</MenuItem>
            <MenuItem value={5}>5 Years</MenuItem>
            <MenuItem value={10}>10 Years</MenuItem>
          </Select>
        </FormControl>

        {emi && (
          <Typography variant="body1" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Monthly EMI: ₹{emi}
          </Typography>
        )}

        <Button variant="outlined" component="label" fullWidth style={{ marginBottom: '20px' }}>
          Upload Loan Document
          <input type="file" hidden onChange={(e) => setDocument(e.target.files[0])} required />
        </Button>

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit Loan Application'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoanApply;
