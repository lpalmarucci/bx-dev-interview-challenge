import {FileResponseDto} from "../types/file.types.ts";
import {HttpService} from "./http.service.ts";

export class FileService extends HttpService{
  constructor() {
    super('/api/file');
  }

  async uploadFile(file: File): Promise<FileResponseDto> {
    try {
      const formdata = new FormData();
      formdata.set('file', file);
      const res = await this.httpClient('/upload', {
        method: "POST",
        body: formdata,
      }).then(res => res.json());
      if(res.statusCode === 400) {
        throw new Error(res.message);
      }
      return res;
    } catch (e) {
      let errorMessage = "Error while uploading file";
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new Error(errorMessage);
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

  async getFiles(): Promise<FileResponseDto[]> {
    try {
      return this.httpClient('/list').then(res => res.json());
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
