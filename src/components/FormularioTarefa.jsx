import React from 'react';
import styles from './FormularioTarefa.module.css';

const FormularioTarefa = ({ input, inputRef, onChange, onEnter, onAdicionar, onCancelar }) => {
  return (
    <div className={styles.form}>
      <input
        type="text"
        value={input}
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onEnter}
        placeholder="Digite o nome da tarefa..."
      />
      <div className={styles.buttons}>
        <button className={styles.cancelar} onClick={onCancelar}>Cancelar</button>
        <button className={styles.addButton} onClick={onAdicionar}>Adicionar</button>
      </div>
    </div>
  );
};

export default FormularioTarefa;
