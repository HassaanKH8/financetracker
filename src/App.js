import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State for amount, category, transactions, and current balance
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const savedBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;
    setTransactions(savedTransactions);
    setCurrentBalance(savedBalance);
  }, []);

  // Save data to localStorage whenever transactions or balance change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('currentBalance', currentBalance.toString());
  }, [transactions, currentBalance]);

  // Handle adding an Income transaction
  const addIncome = () => {
    if (amount && category) {
      const newTransaction = {
        id: Date.now(),
        type: 'Income',
        amount: parseFloat(amount), // Convert string to number
        category,
      };
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      setCurrentBalance(prevBalance => prevBalance + parseFloat(amount)); // Update current balance
      setAmount('');
      setCategory('');
    } else {
      alert('Please enter both amount and category.');
    }
  };

  // Handle adding an Expense transaction
  const addExpense = () => {
    if (amount && category) {
      const newTransaction = {
        id: Date.now(),
        type: 'Expense',
        amount: parseFloat(amount), // Convert string to number
        category,
      };
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      setCurrentBalance(prevBalance => prevBalance - parseFloat(amount)); // Update current balance
      setAmount('');
      setCategory('');
    } else {
      alert('Please enter both amount and category.');
    }
  };

  return (
    <div className="page">
      <h1 className="heading">Awesome Finance Tracker</h1>

      {/* Display Current Balance */}
      <div className="current-balance">
        <h2>Current Balance: ${currentBalance.toFixed(2)}</h2>
      </div>

      {/* Input fields for amount and category */}
      <div className="input-container">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="amount-input"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="category-input"
        />
      </div>

      {/* Buttons for Income and Expense */}
      <div className="themainoptioncontainer">
        <div className="containeroptionincome" onClick={addIncome}>
          <h1>+</h1>
          <h1>Income</h1>
        </div>

        <div className="containeroptionexpense" onClick={addExpense}>
          <h1>-</h1>
          <h1>Expense</h1>
        </div>
      </div>

      {/* Display the list of transactions */}
      <div className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.type}: ${transaction.amount} - {transaction.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
