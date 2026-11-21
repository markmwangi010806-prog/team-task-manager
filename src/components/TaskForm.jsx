
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "Pending",
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
  }, [title, description, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
