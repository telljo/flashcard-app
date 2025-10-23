import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./_header.module.scss";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import Button from "../../components/Button";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className={styles.header}>
        {user && (
          <>
            <a onClick={() => navigate('/')}>Dashboard</a>
            <p>
              Logged in as: <strong>{user?.email_address}</strong>
            </p>

            <Button
              onClick={handleLogout}
              variant="dark"
              size="md">Log out
            </Button>
          </>
        )}
        {!user && (
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            size="md">Log in
          </Button>
        )}
        <ThemeSwitcher />
      </div>
    </>
  );
}
