import { Box, Container, Typography, Link } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PetsIcon color="primary" />
            <Typography variant="body1" color="text.secondary">
              cat-findr
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} cat-findr. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
