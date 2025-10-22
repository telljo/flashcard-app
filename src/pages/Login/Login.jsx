import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import styles from './_login.module.scss';
import formStyles from '../../styles/_form.module.scss';
import Button from "../../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/login", {
        email_address: email,
        password: password
      });
      const { token, user } = response.data;

      login(token, user); // ✅ store both token and user
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  }

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <div className={formStyles.formField}>
          <label
            className={formStyles.formLabel}
          >Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={formStyles.formField}>
          <label
            className={formStyles.formLabel}
          >Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button
          type="submit"
          variant="primary"
          size="md">Log in
        </Button>
      </form>
    </div>
  );
}
