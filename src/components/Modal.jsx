import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, onCancelar }) => {
  return (
    <div className={styles.overlay} onClick={onCancelar}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <span className={styles.modalTitle}>Adicionar tarefa</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
