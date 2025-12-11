import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        boxShadow: "none",
        borderBottom: "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            sx={{
              color: "white",
              "&:hover": { bgcolor: "accent.main" },
            }}
            onClick={() => navigate("/")}
          >
            Cat Findr
          </Button>
        </Typography>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              sx={{
                color: "white",
                "&:hover": { bgcolor: "accent.main" },
              }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: "white" }}
            />
            <Button
              sx={{
                color: "white",
                "&:hover": { bgcolor: "accent.main" },
              }}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              color: "white",
              "&:hover": { bgcolor: "accent.main" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
