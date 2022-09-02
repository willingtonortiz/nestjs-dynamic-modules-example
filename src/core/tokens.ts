import { Observable } from 'rxjs';

export const FILE_UPLOADER_TOKEN = Symbol('FILE_UPLOADER_TOKEN');
export const FILE_UPLOADERS_TOKEN = Symbol('FILE_UPLOADERS_TOKEN');
export const AWS_FILE_UPLOADER_TOKEN = Symbol('AWS_FILE_UPLOADER_TOKEN');
export const AZURE_FILE_UPLOADER_TOKEN = Symbol('AZURE_FILE_UPLOADER_TOKEN');
export const GCP_FILE_UPLOADER_TOKEN = Symbol('GCP_FILE_UPLOADER_TOKEN');

export type UploadFileRequest = unknown;

export interface UploadFileResponse {
  message: unknown;
}

export interface FileUploader {
  uploadFile(data: UploadFileRequest): Observable<UploadFileResponse>;
}
