
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <h1>TeamTask Dashboard</h1>

      <TaskForm />

      <hr />

      <TaskList />
    </div>
  );
}

export default Dashboard;
