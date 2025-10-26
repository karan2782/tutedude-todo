import { useState } from "react";
import CreateTodo from "./components/CreateTodo"
import TodoList from "./components/TodoList"

function App() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://tutedude-todo-backend.onrender.com/todos"
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Something went wrong");
          setLoading(false);
        } else {
          setTodoList(data?.todos);
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch todos");
        setLoading(false);
        console.error("Error fetching todos:", error);
      }
    };
  return (
    <>
    <CreateTodo fetchTodos={fetchTodos} />
    <TodoList todoList={todoList} error={error} loading={loading} fetchTodos={fetchTodos} />
    </>
  )
}

export default App
