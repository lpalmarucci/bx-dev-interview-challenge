import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useMemo} from "react";
import {FileService} from "../../services/file.service.ts";
import {FileResponseDto} from "../../types/file.types.ts";
import {formatBytes} from "../../utils/file.utils.ts";

interface FileDataTableProps {
  files: FileResponseDto[];
  isLoading: boolean;
}

const FileDataTable = ({files, isLoading}: FileDataTableProps) => {
  const fileService = useMemo(() => new FileService(), []);

  const handleDownloadFile = (file: FileResponseDto) => {
    fileService.downloadFile(file.url, file.name)
  }

  if(isLoading){
    return <Stack alignItems='center' justifyContent='center' padding={4} gap={2}>
      <CircularProgress />
      <Typography>Caricamento file in corso...</Typography>
    </Stack>
  }

  if(files.length === 0 ){
    return <Stack padding={4} width='100%' border={1}>
      <Typography align='center' color='textSecondary'>Nessun file caricato</Typography>
    </Stack>
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='left'>
              Filename
            </TableCell>
            <TableCell align='left'>Size</TableCell>
            <TableCell align='right'>Last modified</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            files.map((file) => (
              <TableRow key={file.url}>
                <TableCell align='left'>{file.name}</TableCell>
                <TableCell align='left'>{formatBytes(file.size)}</TableCell>
                <TableCell align="right">{new Date(file.lastModified).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button color='info' size='small' variant='text' onClick={() => handleDownloadFile(file)}>
                    Scarica
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FileDataTable;
