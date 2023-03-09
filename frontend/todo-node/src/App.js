import logo from "./logo.svg";
import "./App.css";
import TodoInput from "./components/TodoInput";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      let data = await axios("http://localhost:4000/todos");
      setTodos(data.data);
    };
    getTodos();
  }, []);

  const addTodo = async (obj) => {
    let data = await axios.post("http://localhost:4000/todos/addtodo", obj);
    console.log(data.data.message);
    let newData = await axios("http://localhost:4000/todos");
    setTodos(newData.data);
  };

  const updatetodo = async (id, updatedData) => {
    let data = await axios.patch(
      `http://localhost:4000/todos/${id}`,
      updatedData
    );
    console.log(data.data.message);
    let newData = await axios("http://localhost:4000/todos");
    setTodos(newData.data);
  };
  const deletetodo = async (id) => {
    let data = await axios.delete(`http://localhost:4000/todos/${id}`);
    console.log(data.data.message);
    let newData = await axios("http://localhost:4000/todos");
    setTodos(newData.data);
  };
  return (
    <div className="App">
      <TodoInput addTodo={addTodo} />

      {todos?.map(({ title, status, _id }) => (
        <div key={_id}>
          <h1>{title}</h1>
          <p
            onClick={() => {
              updatetodo(_id, { status: !status });
            }}
          >
            {status ? "completed" : "not completed"}
          </p>
          <button
            onClick={() => {
              deletetodo(_id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
export default App;
