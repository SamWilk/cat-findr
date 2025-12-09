import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Link,
    Divider,
    Alert
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try{
            const LoginData = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            
            if(!LoginData.ok){
                const errorData = await LoginData.json();
                throw new Error(errorData.details || errorData.error || 'Login failed');
            }
            
            const result = await LoginData.json();
            console.log('Login successful:', result);
            
            // Update auth context
            login(result.user);
            
            navigate('/');
        }catch (error) {
            console.error('Login error:', error);
            setError(error.message);
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <PetsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" component="h1" gutterBottom>
                            Welcome to Cat Findr
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to find your purrfect companion
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        
                        <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
                            <Link href="#" underline="hover" variant="body2">
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 1, mb: 2 }}
                            disabled={submitting}
                        >
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;