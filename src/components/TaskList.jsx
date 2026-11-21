
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {
  const { user } = useSelector((state) => state.auth);
  const allTasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState("all"); // "all" | "pending" | "completed"

  // useMemo: only recompute user-specific tasks when tasks or user changes
  const userTasks = useMemo(() => {
    return allTasks.filter((task) => task.userEmail === user?.email);
  }, [allTasks, user?.email]);

  // useMemo: filter tasks based on the selected filter tab
  const filteredTasks = useMemo(() => {
    if (filter === "pending") {
      return userTasks.filter((task) => task.status === "Pending");
    }
    if (filter === "completed") {
      return userTasks.filter((task) => task.status === "Completed");
    }
    return userTasks;
  }, [userTasks, filter]);

  // useMemo: derived data — count of pending tasks for the current user
  const pendingCount = useMemo(() => {
    return userTasks.filter((task) => task.status === "Pending").length;
  }, [userTasks]);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>My Tasks</h2>
        <p className="pending-count">Pending tasks: {pendingCount}</p>
      </div>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-state">
          No tasks available. {filter !== "all" ? "Try the 'All' tab." : "Add your first task!"}
        </p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

export default TaskList;
