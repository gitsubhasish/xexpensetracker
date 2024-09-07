import React from "react";
import styles from "../ExpenseContainer.module.css";

const ExpenseContainer = ({ onAddExpense, totalExpenses }) => {
  return (
    <div className={styles.container}>
      <h6>
        Expense:{" "}
        <span className={styles.expenseText}>₹{totalExpenses.toFixed(2)}</span>
      </h6>
      <button onClick={onAddExpense} className={styles.addButton}>
        + Add Expense
      </button>
    </div>
  );
};

export default ExpenseContainer;
