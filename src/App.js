import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import styles from "./App.module.css";
import { saveToLocalStorage, getFromLocalStorage } from "./helper/localstorage";
import WalletContainer from "./components/WalletContainer";
import ExpenseContainer from "./components/ExpenseContainer";
import ChartContainer from "./components/ChartContainer";
import ExpenseList from "./ExpenseList";
import AddExpenseModal from "./components/AddExpenseModal";
import AddWalletModal from "./components/AddWalletModal";
import BarChartContainer from "./components/BarChartContainer";

const App = () => {
  const [walletBalance, setWalletBalance] = useState(
    () => getFromLocalStorage("walletBalance") || 5000
  );
  const [expenses, setExpenses] = useState(
    () => getFromLocalStorage("expenses") || []
  );

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Other",
  ];

  useEffect(() => {
    saveToLocalStorage("walletBalance", walletBalance);
    saveToLocalStorage("expenses", expenses);
  }, [expenses, walletBalance]);

  // Modal states
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const saveExpense = (expense) => {
    /*if (expenseToEdit) {
      editExpense(expenseToEdit.id, expense);
    } else {
      if (expense.amount > walletBalance) {
        alert("You cannot spend more than your available wallet balance.");
        return;
      }
      setWalletBalance(walletBalance - expense.amount);
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    }
    setExpenseModalOpen(false);
    setExpenseToEdit(null);*/
    if (expenseToEdit) {
      // Editing an existing expense
      const oldExpense = expenses.find((e) => e.id === expenseToEdit.id);

      if (oldExpense) {
        const newExpenses = expenses.map((e) =>
          e.id === oldExpense.id ? { ...expense, id: e.id } : e
        );

        // Update wallet balance: remove old expense amount and add new expense amount
        setWalletBalance(walletBalance + oldExpense.amount - expense.amount);
        setExpenses(newExpenses);
      }
    } else {
      // Adding a new expense
      if (expense.amount > walletBalance) {
        alert("You cannot spend more than your available wallet balance.");
        return;
      }
      setWalletBalance(walletBalance - expense.amount);
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    }

    setExpenseModalOpen(false);
    setExpenseToEdit(null);
  };

  const editExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...updatedExpense, id } : expense
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    setWalletBalance(walletBalance + expenseToDelete.amount);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const expenseDataByCategory = (expenses) => {
    return expenses.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
  };

  return (
    <div className={styles.containerFluid}>
      {/* Header Section */}
      <header className={styles.header}>
        <h4>Expense Tracker</h4>
      </header>

      {/* First Section */}
      <div className={styles.firstSection}>
        <div className="container">
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.card}>
                <WalletContainer
                  walletBalance={walletBalance}
                  onAddBalance={() => setWalletModalOpen(true)} // Open Add Wallet Modal
                />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.card}>
                <ExpenseContainer
                  totalExpenses={totalExpenses}
                  onAddExpense={() => setExpenseModalOpen(true)}
                />
              </div>
            </div>
            <div className={styles.column}>
              <ChartContainer data={expenses} />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className={styles.secondSection}>
        <div className="container">
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.expenseListCard}>
                <div>
                  <ExpenseList
                    expenses={expenses}
                    deleteExpense={deleteExpense}
                    editExpense={(id) => {
                      const expenseToEdit = expenses.find(
                        (expense) => expense.id === id
                      );
                      setExpenseToEdit(expenseToEdit);
                      setExpenseModalOpen(true); // Open modal for editing
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.card}>
                <div className="card-body">
                  <BarChartContainer data={expenses} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <AddWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onAddBalance={(balance) =>
          setWalletBalance(walletBalance + Number(balance))
        }
      />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setExpenseModalOpen(false);
          setExpenseToEdit(null); // Clear the edit state when closing the modal
        }}
        onAddExpense={saveExpense}
        categories={categories}
        initialExpense={expenseToEdit} // Pass the expense for editing
      />
    </div>
  );
};

export default App;
