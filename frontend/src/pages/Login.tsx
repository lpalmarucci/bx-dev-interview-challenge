import {Alert, Button, Paper, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {FormEvent, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {useAuthContext} from "../contexts/auth.context.tsx";
import {AppRoutes} from "../routes/types.ts";
import {AuthService} from "../services/auth.service.ts";
import {withRedirectIfAuthenticated} from "../hoc/withRedirectIfAuthenticated.tsx";

const LoginPage = () => {
  const {setToken, setIsAuthenticated} = useAuthContext()
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("test@gmail.com")
  const [password, setPassword] = useState<string>("test");
  const authService = useMemo(() => new AuthService(), []);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password)
      setIsAuthenticated(true)
      setToken(response.access_token)
      navigate(AppRoutes.Homepage)
    } catch (error: unknown) {
      let errorMessage = "Error while logging in";
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = error.message as string;
      }
      setOpenSnackbar(true)
      setErrorMessage(errorMessage)
    }
  }

  const handleCloseSnackbar = () => setOpenSnackbar(false)

  return (
    <>
      <Stack sx={{flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
        <Paper elevation={2}>
          <Stack spacing={2} padding={5}>
            <Typography fontSize={24} fontWeight='bold'>Welcome to BX Code challenge</Typography>
            <form noValidate onSubmit={handleFormSubmit}>
              <Stack spacing={2} marginBottom={2}>
                <TextField type='email' name='email' variant='outlined' label='Email' value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField type='password' name='password' variant='outlined' label='Password' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
              </Stack>
              <Button variant='contained' fullWidth type='submit'>
                Login
              </Button>
            </form>
          </Stack>
        </Paper>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{width: '100%'}}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}


export default withRedirectIfAuthenticated(LoginPage, AppRoutes.Homepage);
