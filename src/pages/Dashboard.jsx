import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Alert from "../components/Alert";

function Dashboard() {
  const [welcomeAlert, setWelcomeAlert] = useState(true);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <h1>TeamTask Dashboard</h1>
        <p>Manage your tasks and stay organized.</p>

        {welcomeAlert && (
          <Alert
            message="Welcome back! You're logged in. Your tasks are saved automatically."
            type="success"
            onClose={() => setWelcomeAlert(false)}
          />
        )}

        <div className="dashboard-grid">
          <div className="dashboard-panel">
            <TaskForm />
          </div>

          <div className="dashboard-panel">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
