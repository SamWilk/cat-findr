import { Box, Typography, Divider } from "@mui/material";

const MyCats = ({ user }) => {
  console.log("Showing my cats for : ", user.email);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Cats
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="body1" color="text.secondary">
        Your cats will be displayed here.
      </Typography>
      {/* You can access user data like: {user.email} */}
    </Box>
  );
};

export default MyCats;
