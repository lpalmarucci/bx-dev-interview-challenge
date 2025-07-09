import {Alert, Button, Snackbar, Stack, Typography} from "@mui/material";
import {ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState} from "react";
import {FileService} from "../services/file.service.ts";
import type {ApiResultStatus} from "../types/generic.ts";
import {UploadFileResponseDto} from "../types/file.ts";
import {MAX_FILE_SIZE} from "../utils/constants.ts";

const UploadFileForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const fileService = useMemo(() => new FileService(), []);
  const [uploadedFile, setUploadedFile] = useState<UploadFileResponseDto>()
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<{ status: ApiResultStatus, message: string }>()
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)


  const handleDrop = (files?: FileList) => {
    if (selectedFile) return;
    if (!files || files.length === 0) return;
    setSelectedFile(files[0]);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedFile) return;
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if(file.size >= MAX_FILE_SIZE) {
      setOpenSnackbar(true);
      setUploadResult({status: 'error', message: 'Il file è troppo grande'});
      return;
    }
    setSelectedFile(files[0]);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;
    try {
      setIsUploadingFile(true);
      const res = await fileService.uploadFile(selectedFile)
      setUploadResult({status: 'success', message: 'File caricato con successo'})
      setSelectedFile(undefined)
      setUploadedFile(res)
    } catch (e: unknown) {
      let errorMessage = 'Generic error';
      if(e instanceof Error)
        errorMessage = e.message;
      setUploadResult({status: 'error', message: errorMessage})
    } finally {
      setOpenSnackbar(true)
      setIsUploadingFile(false)
    }
  }

  const handleCloseSnackbar = () => {
    setUploadResult(undefined)
    setOpenSnackbar(false)
  }

  const renderAlert = useCallback(() => {
    if (!uploadResult) return;
    if (uploadResult.status === 'success') {
      return (<Alert
        onClose={handleCloseSnackbar}
        severity="success"
        variant="filled"
        sx={{width: '100%'}}
        action={
        <Button size='small' onClick={handleDownloadFile} color='inherit'>
          Scarica
        </Button>
        }
      >
        {uploadResult.message}
      </Alert>)
    }
    return (
      <Alert
        onClose={handleCloseSnackbar}
        severity="error"
        variant="filled"
        sx={{width: '100%'}}
        closeText='Chiudi'
      >
        {uploadResult.message}
      </Alert>
    )
  }, [uploadResult])

  const handleDownloadFile = async () => {
    if (!uploadedFile) return;
    await fileService.downloadFile(uploadedFile.url, uploadedFile.name)
  }

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit}>
        <Stack
          onDrop={e => {
            e.stopPropagation();
            handleDrop(e.dataTransfer?.files)
          }}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            width: "100%",
            marginBottom: 1,
          }}
          justifyContent='center'
          alignItems='center'
          onClick={() => inputRef.current?.click()}
        >
          {
            selectedFile ?
              <Stack direction='column' gap={{xs: '2px'}} maxWidth={{xs: 'fit-content'}} justifyContent='center'
                     alignItems='center'>
                <Typography>
                  {selectedFile?.name}
                </Typography>
                <Button variant='outlined' color='error' onClick={() => setSelectedFile(undefined)}>
                  Cancella
                </Button>
              </Stack>
              :
              <Stack>
                <Typography variant="h6">
                  Trascina qui un file
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Oppure clicca per selezionare
                </Typography>
                <Typography variant="body2" fontSize={12}>
                  (File consentiti: .png, .jpeg, .jpg. Dimensione massima: 1mb)
                </Typography>
                <input
                  id="fileInput"
                  type="file"
                  hidden
                  ref={inputRef}
                  onChange={handleFileSelect}
                  accept='image/png, image/jpeg'
                />
              </Stack>
          }
        </Stack>
        <Button variant='contained' fullWidth type='submit' loading={isUploadingFile} disabled={!selectedFile}>
          Carica
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        {renderAlert()}
      </Snackbar>
    </>
  )
}

export default UploadFileForm;
