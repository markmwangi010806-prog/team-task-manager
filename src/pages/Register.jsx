
import AuthForm from "../components/AuthForm";

function Register() {
  return (
    <div>
      <h1>Create Account</h1>
      <p>Register for your TeamTask account.</p>

      <AuthForm isRegister={true} />
    </div>
  );
}

export default Register;
