import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <span className={styles.modalTitle}>Adicionar tarefa</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
