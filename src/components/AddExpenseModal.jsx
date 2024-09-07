import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../ExpenseModal.module.css";
Modal.setAppElement("#root");
const AddExpenseModal = ({
  isOpen,
  onClose,
  onAddExpense,
  categories,
  initialExpense,
}) => {
  const [title, setTitle] = useState(initialExpense?.title || "");
  const [amount, setAmount] = useState(initialExpense?.amount || "");
  const [date, setDate] = useState(initialExpense?.date || "");
  const [category, setCategory] = useState(initialExpense?.category || "");

  useEffect(() => {
    if (initialExpense) {
      setTitle(initialExpense.title);
      setAmount(initialExpense.amount);
      setDate(initialExpense.date);
      setCategory(initialExpense.category);
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");
    }
  }, [initialExpense]);

  const handleSave = () => {
    if (
      !title ||
      !amount ||
      isNaN(amount) ||
      Number(amount) <= 0 ||
      !date ||
      !category
    ) {
      alert("Please fill all fields with valid data.");
      return;
    }

    const expense = {
      title,
      amount: Number(amount),
      date,
      category,
    };

    onAddExpense(expense);
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <Modal
      contentLabel="Add/Edit Expense"
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>{initialExpense ? "Edit Expense" : "Add Expense"}</h2>
      <div className={styles.row}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.row}></div>
      <div className={styles.row}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className={styles.row}></div>

      <div className={styles.buttonRow}>
        <button
          onClick={handleSave}
          className={`${styles.button} ${styles.saveButton}`}
        >
          {initialExpense ? "Save Changes" : "Add"}
        </button>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
