import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box } from "@mui/material";

function AuthButton() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <Box sx={{ ml: "50px" }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => loginWithRedirect()}
          >
            Войти
          </Button>
        </Box>
      )}

      {isAuthenticated && (
        <Box sx={{ ml: "50px" }}>
          <Button variant="outlined" color="inherit" onClick={() => logout()}>
            Выйти
          </Button>
        </Box>
      )}
    </>
  );
}

export default AuthButton;
