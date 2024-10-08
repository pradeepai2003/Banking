import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';
import AdminLogin from './Pages/adminLogin';
import AdminDashboard from './Pages/adminDashboard';
import AccountOpening from './Pages/accountOpening';
import Layout from './Pages/layout'; // Import Admin Layout component
import CustomerLayout from './Pages/customerLayout'; // Import Customer Layout component
import CustomerDashboard from './Pages/customerDashboard'; // Import Customer Dashboard component
import ManageAccounts from './Pages/manageAccounts';
import LoanApply from './Pages/loanApply';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminLogin" element={<AdminLogin />} />

        {/* Protected routes under Admin Layout */}
        <Route element={<Layout />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} /> 
          <Route path="/accountOpening" element={<AccountOpening />} /> 
          
          {/* <Route path="loanRequest" element={<LoanRequest />} />
          <Route path="interestRateManagement" element={<InterestRateManagement />} /> */}
        </Route>

        {/* Protected routes under Customer Layout */}
        <Route element={<CustomerLayout />}>
          <Route path="/customerDashboard" element={<CustomerDashboard />} />
          <Route path="/manageAccounts" element={<ManageAccounts />} /> 
          <Route path="/loanApply" element={<LoanApply />} /> 
          {/* Add more customer routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
