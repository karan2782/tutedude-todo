import React, { useEffect, useState } from "react";
import "./TodoList.css";
import EditTodo from "./EditTodo";

const TodoList = ({ todoList, error, loading, fetchTodos }) => {

    const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);



  const handleDelete = async (id)=>{
    try {
        
        const res = await fetch(`https://tutedude-todo-backend.onrender.com/todos/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!res.ok){
            alert(data.message || "Failed to delete todo");
        }else{
            alert("Todo deleted successfully");
            fetchTodos();
        }
    } catch (error) {
        alert("Error deleting todo");
        console.error("Error deleting todo:", error);
    }
  }

  return (
    <div>
      {loading && <p style={{textAlign:'center'}}>Loading todos...</p>}
      {error && <p style={{ color: "red", textAlign:'center' }}>Error: {error}</p>}
      {!loading && !error && (
        <ul className="todo-list">
          {todoList.map((todo) => (
            <>
            <li key={todo.id} className="todo-item">
              <p>{todo.title}</p>
              <p>
                <strong>Status:</strong>{" "}
                {todo.completed ? "Completed" : "Pending"}
              </p>
              <div className="todo-actions">
                <button onClick={()=>handleDelete(todo._id)}>🗑️</button>
                <button onClick={()=>setEditTodo(todo._id)}>✏️</button>
              </div>
            </li>
            {editTodo === todo._id && (<EditTodo id={todo._id} fetchTodos={fetchTodos} setEditTodo={setEditTodo} />)}
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
