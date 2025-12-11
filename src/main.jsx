import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Login from "./components/login/login.jsx";
import Profile from "./pages/profile/profile.jsx";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#5dc8ff",
    },
    secondary: {
      main: "#d2eee9",
    },
    accent: {
      main: "#2d8a7e",
    },
    background: {
      default: "#d2eee9",
      paper: "#FAFAF8",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
