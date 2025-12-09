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
    Chip
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import PetsIcon from '@mui/icons-material/Pets';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const sendBackIfNotLoggedIn = () => {
        if (!user) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }
    if (!user) {
        sendBackIfNotLoggedIn();
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h5">Please log in to view your profile, redirecting to home...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                {/* Profile Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            mr: 3
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            My Profile
                        </Typography>
                        <Chip
                            label={user.role || 'User'}
                            color="primary"
                            size="small"
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Profile Information */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon color="primary" />
                            Email
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            User ID
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {user.id}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Account Details */}
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PetsIcon color="primary" />
                    Account Information
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Account Type"
                            secondary={user.role === 'authenticated' ? 'Authenticated User' : user.role}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Account Status"
                            secondary={<Chip label="Active" color="success" size="small" />}
                        />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    );
};

export default Profile;