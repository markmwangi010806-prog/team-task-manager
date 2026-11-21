
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleStatusChange = () => {
    dispatch(
      updateTask({
        id: task.id,
        title: task.title,
        status: task.status === "Pending" ? "Completed" : "Pending",
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
        title: title,
        status: task.status,
      })
    );

    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit">Save</button>

          <button type="button" onClick={() => {
            setTitle(task.title);
            setIsEditing(false);
          }}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </>
      )}

      <p>Status: {task.status}</p>

      <button onClick={handleStatusChange}>
        {task.status === "Pending" ? "Complete" : "Mark Pending"}
      </button>

      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default memo(TaskItem);
