import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {FormEvent, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {useAuthContext} from "../contexts/auth.context.tsx";
import {AppRoutes} from "../routes/types.ts";
import {AuthService} from "../services/auth.service.ts";

const LoginPage = () => {
  const {isAuthenticated, setToken, setIsAuthenticated} = useAuthContext()
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const authService = useMemo(() => new AuthService(), []);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(AppRoutes.Homepage)
  }, [])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await authService.login(email, password)
    setIsAuthenticated(true)
    setToken(response.access_token)
    navigate(AppRoutes.Homepage)
  }

  return (
    <Stack sx={{flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
      <Paper elevation={2}>
        <Stack spacing={2} padding={5}>
          <Typography fontSize={24} fontWeight='bold'>Welcome to BX Code challenge</Typography>
          <form noValidate onSubmit={handleFormSubmit}>
            <Stack spacing={2} marginBottom={2}>
              <TextField name='email' variant='outlined' label='Email' value={email}
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
  )
}
export default LoginPage
