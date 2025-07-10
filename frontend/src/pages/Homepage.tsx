import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import {AppRoutes} from "../routes/types.ts";
import {useNavigate} from "react-router";
import {useAuthContext} from "../contexts/auth.context.tsx";
import FileSection from "../components/file/FileSection.tsx";

const Homepage = () => {
  const {setToken} = useAuthContext()
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            BonusX Interview Challenge
          </Typography>
          <Button color="inherit" onClick={() => {
            setToken(null)
            navigate(AppRoutes.Login)
          }}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Paper sx={{p: 2, mb: 3}}>
              <Typography variant="h4" gutterBottom>
                Benvenuto nell'applicazione
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Questa è l'impostazione iniziale per l'app con Material-UI
                configurato correttamente.
              </Typography>
            </Paper>
          </Grid>

          <FileSection />

          <Grid size={12}>
            <Paper sx={{p: 2}}>
              <Typography variant="h6" gutterBottom>
                Stato dell'applicazione
              </Typography>
              <Typography variant="body2">
                ✅ Material-UI configurato correttamente
                <br/>
                ✅ Tema personalizzabile
                <br/>
                ✅ Font Roboto caricato
                <br/>
                ✅ Layout responsivo
                <br/>✅ Componenti base implementati
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default Homepage
