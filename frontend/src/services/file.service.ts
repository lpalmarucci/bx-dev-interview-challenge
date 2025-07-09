import {UploadFileResponseDto} from "../types/file.ts";
import {HttpService} from "./http.service.ts";

export class FileService extends HttpService{
  async uploadFile(file: File): Promise<UploadFileResponseDto> {
    try {
      const formdata = new FormData();
      formdata.set('file', file);
      return this.httpClient('/api/file/upload', {
        method: "POST",
        body: formdata,
      }).then(res => res.json());
    } catch {
      throw new Error('Error while uploading file');
    }
  }

  async downloadFile(url: string, name: string): Promise<void>{
    try {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
          'download',
          name,
      );
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    } catch {
      throw new Error('Error while downloading file');
    }

  }
}
