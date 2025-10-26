import React, { useState } from "react";
import "./CreateTodo.css";
const CreateTodo = ({fetchTodos}) => {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(null);

    const createTodo = async (todoData) => {
        try {
            const res  = await fetch("https://tutedude-todo-backend.onrender.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todoData),
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                alert(data.message || "Failed to create todo");
            }else{
                alert("Todo created successfully");
                setTitle("");
                setStatus(null);
                fetchTodos();
            }           
        } catch (error) {
            alert("Error creating todo");
            console.error("Error creating todo:", error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(title===""){
            alert("Title is required");
            return;
        }
        const todoData = {
            title,
            completed: status === "true" ? true : false,
        }
        createTodo(todoData);
        console.log('todoData:', todoData);
        console.log({title, status});
    }
  return (
    <div>
      <form className="create-form" onSubmit={handleSubmit}>
        <h3 style={{textAlign:'center'}}>Create Todo</h3>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" placeholder="Enter todo title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={null}>Select Status</option>
              <option value={false}>Pending</option>
              <option value={true}>Completed</option>
            </select>
        </div>
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
};

export default CreateTodo;
