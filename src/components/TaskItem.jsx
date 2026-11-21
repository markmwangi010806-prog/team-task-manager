
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleStatusChange = () => {
    dispatch(
      updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status === "Pending" ? "Completed" : "Pending",
        dueDate: task.dueDate,
      })
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch(
      updateTask({
        id: task.id,
        title,
        description,
        status: task.status,
        dueDate,
      })
    );

    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  // Determine if a pending task is past its due date
  const isOverdue =
    task.dueDate &&
    task.status === "Pending" &&
    new Date(task.dueDate) < new Date();

  return (
    <div className={`task-item ${isOverdue ? "overdue" : ""} ${task.status === "Completed" ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleEdit} className="edit-form">
          <div className="form-group">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setTitle(task.title);
              setDescription(task.description || "");
              setDueDate(task.dueDate || "");
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="task-header">
            <div className="task-info">
              <h3>{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
            </div>
            {task.dueDate && (
              <div className={`task-due-date ${isOverdue ? "overdue-text" : ""}`}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue && " (Over!)"}
              </div>
            )}
          </div>

          <p className="task-status">
            Status: <span>{task.status}</span>
          </p>

          <button onClick={handleStatusChange} className="btn btn-outline">
            {task.status === "Pending" ? "Complete" : "Mark Pending"}
          </button>

          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn btn-outline">
              Edit
            </button>
          )}

          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default memo(TaskItem);
