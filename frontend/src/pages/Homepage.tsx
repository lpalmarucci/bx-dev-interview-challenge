import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import UploadFileForm from "../components/UploadFileForm.tsx";
import {AppRoutes} from "../routes/types.ts";
import {useNavigate} from "react-router";
import {useAuthContext} from "../contexts/auth.context.tsx";
import FileDataTable from "../components/FileDataTable.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import {FileResponseDto} from "../types/file.types.ts";
import {FileService} from "../services/file.service.ts";

const Homepage = () => {
  const {setToken} = useAuthContext()
  const [uploadedFiles, setUploadedFiles] = useState<FileResponseDto[]>([]);
  const fileService = useMemo(() => new FileService(), []);
  const navigate = useNavigate();


  const fetchData = useCallback(async () => {
    try {
      const files = await fileService.getFiles()
      setUploadedFiles(files);
    } catch (e){
      console.error(e);
    }
  }, []);

  const handleUploadFileCallback = () => {
    fetchData();
  }

  useEffect(() => {
    handleUploadFileCallback()
  }, [])

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

          <Grid size={{xs: 12, md: 6}}>
            <Card>
              <CardContent>
                <Stack gap={{xs: '1rem'}}>
                  <UploadFileForm onUploadedFile={handleUploadFileCallback}/>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Card>
              <CardContent>
                <FileDataTable files={uploadedFiles} />
              </CardContent>
            </Card>
          </Grid>

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
