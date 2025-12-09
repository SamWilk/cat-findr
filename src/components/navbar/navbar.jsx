import { AppBar, Toolbar, Typography, Button, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    console.log('Navbar user:', user);
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button color='inherit' onClick={() => navigate('/')}>Cat Findr</Button>
                </Typography>
                {user ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button color="inherit" onClick={handleLogout}>Sign Out</Button>
                    </Box>
                ) : (
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;