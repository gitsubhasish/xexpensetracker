import React from "react";
import styles from "../WalletContainer.module.css";

const WalletContainer = ({ walletBalance, onAddBalance }) => {
  return (
    <div className={styles.container}>
      <h6>
        Wallet Balance:{" "}
        <span className={styles.walletBalance}>
          ₹{`${walletBalance.toFixed(2)}`}
        </span>
      </h6>
      <button onClick={onAddBalance} className={styles.addButton}>
        + Add Wallet Balance
      </button>
    </div>
  );
};

export default WalletContainer;
