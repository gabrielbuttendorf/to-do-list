import React from 'react';
import styles from './TarefaItem.module.css';
import { TrashSimpleIcon } from '@phosphor-icons/react';

const TarefaItem = ({ tarefa, onCheck, onDeletar }) => {
  return (
    <li
      className={styles.tarefaItem}
      key={tarefa.nome}
      data-nome={tarefa.nome}
      style={tarefa.isConcluida ? { textDecoration: 'line-through' } : null}
    >
      <label className={styles.inputLabel}>
        <input
          id="input"
          type="checkbox"
          name={tarefa.nome}
          checked={tarefa.isConcluida}
          onChange={onCheck}
        />

        <span>{tarefa.nome}</span>
      </label>

      <button className={styles.deleteButton} onClick={onDeletar}>
        <TrashSimpleIcon size={20} />
      </button>
    </li>
  );
};

export default TarefaItem;
