
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>TeamTask</h2>
      </div>

      {isAuthenticated && user ? (
        <div className="navbar-actions">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar-actions">
          <a href="/login" className="btn btn-outline">Login</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
