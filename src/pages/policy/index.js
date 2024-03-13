import React from "react";
import Link from "next/link";
import styles from "./policy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Privacy Policy</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis,
          justo eu convallis convallis, lorem purus pharetra dui, a luctus est
          mi id neque.
        </p>
        <p>
          Nullam quis mauris vel lorem convallis vehicula. Nunc sit amet tortor
          non nisl blandit tincidunt vel vel justo.
        </p>
        <Link href="/" className="back-to-home-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
