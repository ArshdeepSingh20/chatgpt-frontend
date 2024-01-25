import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent:"center" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                to="/chat"
                text="Go to Chat"
                buttonWidth="20px"
              />
              <NavigationLink
                to="/"
                text="Logout"
                onClick={auth.logout}
                buttonWidth="20px"
              />
            </>
          ) : (
            <>
              <NavigationLink
                to="/login"
                text="Login"
                buttonWidth="40px"
              />
              <NavigationLink
                to="/signup"
                text="Signup"
                buttonWidth="20px"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
