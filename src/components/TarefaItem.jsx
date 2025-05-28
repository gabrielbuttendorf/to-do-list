import React from 'react';

const TarefaItem = ({ tarefa, onCheck, onDeletar }) => {
  return (
    <li
      key={tarefa.nome}
      data-nome={tarefa.nome}
      style={tarefa.isConcluida ? { textDecoration: 'line-through' } : null}
    >
      <input
        type="checkbox"
        name={tarefa.nome}
        checked={tarefa.isConcluida}
        onChange={onCheck}
      />

      {tarefa.nome}

      <button onClick={onDeletar}>Delete</button>
    </li>
  );
};

export default TarefaItem;
