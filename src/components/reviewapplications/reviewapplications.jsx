import { Box, Typography, Divider } from "@mui/material";

const ReviewApplications = ({ user, userprofile }) => {
  console.log("Showing review applications for : ", user.email);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Review Applications
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="body1" color="text.secondary">
        Your applications to review will be displayed here.
      </Typography>
      {/* You can access user data like: {user.email} */}
    </Box>
  );
};

export default ReviewApplications;
