
import { useMemo } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const pendingCount = useMemo(() => {
    return tasks.filter((task) => task.status === "Pending").length;
  }, [tasks]);

  return (
    <div>
      <h2>My Tasks</h2>

      <p>Pending tasks: {pendingCount}</p>

      {tasks.length === 0 ? (
        <p>No tasks available. Add your first task!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

export default TaskList;
