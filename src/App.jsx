import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
} from '@mui/material'

function App() {

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Cat Findr
        </Typography>
        
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Welcome to Cat Findr
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              A centralized platform connecting cat rescues with potential adopters.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default App;
