
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!title.trim()) {
        return;
      }

      const newTask = {
        id: Date.now(),
        title,
        description,
        status: "Pending",
        dueDate,
        userEmail: user?.email || "unknown",
        createdAt: new Date().toISOString(),
      };

      dispatch(addTask(newTask));

      setTitle("");
      setDescription("");
      setDueDate("");
    },
    // useCallback memoizes the handler so it is not recreated on every render
    [title, description, dueDate, user?.email, dispatch]
  );

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>

      <div className="form-group">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Task description (optional)</label>
        <textarea
          id="task-description"
          placeholder="Add details about this task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-due-date">Due date</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
}

export default TaskForm;
