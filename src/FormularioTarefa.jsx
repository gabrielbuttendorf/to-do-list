import React from 'react';

const FormularioTarefa = ({ input, inputRef, onChange, onEnter, onAdicionar, onRemover }) => {
  return (
    <div>
      <input
        type="text"
        value={input}
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onEnter}
      />
      <button onClick={onAdicionar}>Adicionar Tarefa</button>
      <button onClick={onRemover}>Remover todas as Tarefas</button>
    </div>
  );
};

export default FormularioTarefa;
