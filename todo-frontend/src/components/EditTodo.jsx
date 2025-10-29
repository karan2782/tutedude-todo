import React, { useEffect } from "react";
import "./EditTodo.css";
const EditTodo = ({ fetchTodos, id, setEditTodo }) => {
  const [todoData, setTodoData] = React.useState({
    title: "",
    completed: false,
  });
  const fetchTodoById = async (id) => {
    try {
      const res = await fetch(
        `https://tutedude-todo-backend.onrender.com/todos/${id}`
      );
      const data = await res.json();
      if (res.ok) {
        setTodoData({
          title: data.todo.title,
          completed: data.todo.completed,
        });
        console.log(data);
      } else {
        alert(data.message || "Failed to fetch todo");
      }
    } catch (error) {
      alert("Error fetching todo");
      console.error("Error fetching todo:", error);
    }
  };

  useEffect(() => {
    fetchTodoById(id);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://tutedude-todo-backend.onrender.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Todo updated successfully");
        fetchTodos();
      } else {
        alert(data.message || "Failed to update todo");
      }
    } catch (error) {
      alert("Error updating todo");
      console.error("Error updating todo:", error);
    }
    setEditTodo(null);
  };
  return (
    <div className="edit-todo-modal">
      <form onSubmit={handleUpdate} className="edit-form">
        <div className="form-group">
        <div className="cross-icon" onClick={() => setEditTodo(null)}>Close</div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter todo title"
            value={todoData?.title}
            onChange={(e) =>
              setTodoData({ ...todoData, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="checkbox"
            value={true}
            name="status"
            checked={todoData?.completed}
            onChange={(e) =>
              setTodoData({ ...todoData, completed: e.target.checked })
            }
          />
        </div>
        <button type="submit">Update Todo</button>
      </form>
    </div>
  );
};

export default EditTodo;
