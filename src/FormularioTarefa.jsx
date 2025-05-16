import React from 'react';

const FormularioTarefa = ({ input, inputRef, onChange, onEnter, onAdicionar }) => {
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
    </div>
  );
};

export default FormularioTarefa;
