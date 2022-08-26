import React from 'react';
import './style.css';
import axios from 'axios';

const url = 'https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks';

export default function App() {
  const [tarefas, setTarefas] = React.useState(['conteudo']);

  const [user, set] = React.useState({});

  const [inputTarefa, setInputTarefa] = React.useState('');

  const handOnSubmit = (e) => e.preventDefault();

  const handleOnClickAdicionar = () => {
    const novoArray = tarefas;
    novoArray.push(inputTarefa);
    setTarefas([...novoArray]);
    setInputTarefa('');
  };

  React.useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
      setTarefas(response.data);
    });
  }, []);

  const handleOnClickDeletar = (index) => {
    const novasTarefas = tarefas.filter((tarefa, _index) => {
      return _index !== index;
    });
    setTarefas(novasTarefas);
  };

  return (
    <div className="container">
      <div className="conteudo">
        <h1 className="titulo">Tarefas</h1>
        <h2>{user.completed}</h2>
        <div>
          <form onSubmit={handOnSubmit}>
            <div className="tarefa_box">
              <label htmlFor="tarefa">Tarefa</label>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <input
                  id="tarefa"
                  name="tarefa"
                  value={inputTarefa}
                  onChange={(e) => setInputTarefa(e.target.value)}
                  placeholder="minha tarefa"
                />
                <button
                  className="btn btn_adicionar"
                  onClick={handleOnClickAdicionar}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
          <section>
            <ul>
              {tarefas.map((tarefa, index) => (
                <li>
                  <input className="" type="checkbox" />
                  <input className="tarefa_conteudo" disabled value={tarefa} />
                  <button
                    className="btn btn_excluir"
                    onClick={() => handleOnClickDeletar(index)}
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
