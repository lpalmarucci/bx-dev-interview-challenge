import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {CssBaseline, StyledEngineProvider, ThemeProvider,} from "@mui/material";
import theme from "./theme";
import {browserRouter} from "./routes/constants.tsx";
import {RouterProvider} from "react-router";
import {AuthProvider} from "./contexts/auth.context.tsx";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={browserRouter}/>
        </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
}

export default App;
