import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PetsIcon from "@mui/icons-material/Pets";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import FeedIcon from "@mui/icons-material/Feed";
import BadgeIcon from "@mui/icons-material/Badge";
import { useNavigate } from "react-router";
import MyCats from "../../components/mycats/mycats.jsx";
import ReviewApplications from "../../components/reviewapplications/reviewapplications.jsx";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [userProfile, setUserProfile] = useState({
    UserProfileID: null,
    UserName: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchProfileData = async () => {
        if (user && user.id) {
          setLoading(true);
          const response = await fetch(`/api/profile?UserProfileID=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched profile data: ", data);
            setUserProfile(data.profile);
          } else {
            console.error("Failed to fetch profile data");
          }
          setLoading(false);
        }
      };
      fetchProfileData();
    } catch (error) {
      console.error("Error fetching profile data: ", error);
      setLoading(false);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const sendBackIfNotLoggedIn = () => {
    if (!user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  if (!user) {
    sendBackIfNotLoggedIn();
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">
          Please log in to view your profile, redirecting to home...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Vertical Navigation */}
        <Paper elevation={3} sx={{ minWidth: 200, height: "fit-content" }}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              label="Profile"
              icon={<PersonIcon />}
              iconPosition="start"
              sx={{ justifyContent: "flex-start", minHeight: 60 }}
            />
            <Tab
              label="My Cats"
              icon={<PetsIcon />}
              iconPosition="start"
              sx={{ justifyContent: "flex-start", minHeight: 60 }}
            />
            <Tab
              label="Review Applications"
              icon={<FeedIcon />}
              iconPosition="start"
              sx={{ justifyContent: "flex-start", minHeight: 60 }}
            />
          </Tabs>
        </Paper>

        {/* Content Area */}
        <Paper elevation={3} sx={{ p: 4, flexGrow: 1 }}>
          {/* Profile Tab */}
          {activeTab === 0 && (
            <Box>
              {/* Profile Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.main",
                    mr: 3,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    My Profile
                  </Typography>
                  <Chip
                    label={user.role || "User"}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Profile Information */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <EmailIcon color="primary" />
                    Email
                  </Typography>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      {user.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <BadgeIcon color="primary" />
                    User Name
                  </Typography>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      {userProfile.UserName ?? "Not set"}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Account Details */}
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PetsIcon color="primary" />
                Account Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Account Type"
                    secondary={
                      user.role === "authenticated"
                        ? "Authenticated User"
                        : user.role
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Account Status" />
                  <Chip label="Active" color="success" size="small" />
                </ListItem>
              </List>
            </Box>
          )}

          {activeTab === 1 && <MyCats user={user} userprofile={userProfile} />}

          {activeTab === 2 && (
            <ReviewApplications user={user} userprofile={userProfile} />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
