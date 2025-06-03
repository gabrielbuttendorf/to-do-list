import React from 'react';
import styles from './RemoveAll.module.css';

const RemoveAll = ({ onAceitar, onCancelar }) => {
  return (
    <div className={styles.wrapper}>
      <p>Tem certeza que deseja remover todas as tarefas?</p>

      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={onCancelar}>
          Cancelar
        </button>
        <button className={styles.acceptButton} onClick={onAceitar}>
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default RemoveAll;
