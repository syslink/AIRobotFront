import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/" className={styles.logo}>
        AI足球大师
      </Link>
    </div>
  );
}
