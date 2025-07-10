import {Button, Stack} from "@mui/material";
import UploadFileDialog from "./UploadFileDialog.tsx";
import FileDataTable from "./FileDataTable.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import {FileService} from "../../services/file.service.ts";
import {FileResponseDto} from "../../types/file.types.ts";

const FileSection = () => {
  const [openUploadFileDialog, setOpenUploadFileDialog] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileResponseDto[]>([]);
  const [isFetchingFiles, setIsFetchingFiles] = useState<boolean>(false)
  const fileService = useMemo(() => new FileService(), []);

  const fetchData = useCallback(async () => {
    try {
      setIsFetchingFiles(true);
      const files = await fileService.getFiles()
      setUploadedFiles(files);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingFiles(false);
    }
  }, []);

  const handleUploadFileCallback = async () => {
    setOpenUploadFileDialog(false);
    fetchData();
  }

  useEffect(() => {
    handleUploadFileCallback()
  }, [])

  const handleCloseDialog = (shouldUpdate: boolean) => {
    setOpenUploadFileDialog(false)
    if(shouldUpdate)
      fetchData();
  }

  return (
    <Stack direction='column' width='100%' justifyContent='center' gap={2}>
      <Button
        onClick={() => setOpenUploadFileDialog(true)}
        variant='contained'
        sx={{
          width: 'fit-content',
          alignSelf: 'flex-end'
        }}
      >
        Upload file
      </Button>
      <FileDataTable files={uploadedFiles} isLoading={isFetchingFiles}/>
      <UploadFileDialog
        open={openUploadFileDialog}
        onClose={handleCloseDialog}
      />
    </Stack>)
}

export default FileSection;
