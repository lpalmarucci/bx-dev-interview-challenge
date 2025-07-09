import {CircularProgress, Stack} from "@mui/material";

const PageLoader = () => {
  return (
    <Stack justifyContent='center' alignItems='center' width='100%' height='100vh'>
      <CircularProgress />
    </Stack>
  )
}

export default PageLoader;
