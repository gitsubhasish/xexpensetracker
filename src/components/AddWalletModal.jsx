import React, { useState } from "react";
import Modal from "react-modal";
import styles from "../ExpenseModal.module.css";
Modal.setAppElement("#root");
const AddWalletModal = ({ isOpen, onClose, onAddBalance }) => {
  const [balance, setBalance] = useState("");

  const handleSave = () => {
    onAddBalance(balance);
    setBalance("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Wallet Balance"
      className={styles.modal}
    >
      <h2>Add Wallet Balance</h2>
      <div className={styles.row}>
        <input
          type="number"
          placeholder="Enter balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <button
          className={`${styles.button} ${styles.saveButton}`}
          onClick={handleSave}
        >
          Add
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

export default AddWalletModal;
