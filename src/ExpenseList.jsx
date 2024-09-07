import React from "react";
import styles from "./ExpenseList.module.css";
import {
  FaEdit,
  FaTrash,
  FaPizzaSlice,
  FaCar,
  FaFilm,
  FaQuestion,
} from "react-icons/fa";

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaPizzaSlice />;
      case "Travel":
        return <FaCar />;
      case "Entertainment":
        return <FaFilm />;
      // Add more cases as needed
      default:
        return <FaQuestion />;
    }
  };

  return (
    <div>
      <table className={styles.expenseTable}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Title & Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                <div className={styles.iconContainer}>
                  {getCategoryIcon(expense.category)}
                </div>
              </td>
              <td>
                <strong>{expense.title}</strong> <br />{" "}
                <span style={{ color: "#d7d7d7" }}>{expense.date}</span>
              </td>
              <td>₹{expense.amount}</td>
              <td>
                <button
                  onClick={() => editExpense(expense.id)}
                  className={styles.iconButton}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className={styles.iconButton}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
