import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ title, children, onCancelar }) => {
  return (
    <div className={styles.overlay} onClick={onCancelar}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <span className={styles.modalTitle}>{title}</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
