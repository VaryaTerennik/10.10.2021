import { useAuth0 } from "@auth0/auth0-react";
import style from "./AuthButton.module.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AuthButton() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => loginWithRedirect()}
        >
          Войти
        </Button>
      )}

      {isAuthenticated && (
        <div className={style.AuthBlock}>
          <AccountCircleIcon />
          <div>{user.name}</div>
          <Button variant="outlined" color="primary" onClick={() => logout()}>
            Выйти
          </Button>
        </div>
      )}
    </>
  );
}

export default AuthButton;
