import { Injectable } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

import {
  FileUploader,
  UploadFileRequest,
  UploadFileResponse,
} from '../../core/tokens';

@Injectable()
export class AzureFileUploaderService implements FileUploader {
  uploadFile(data: UploadFileRequest): Observable<UploadFileResponse> {
    return of({ message: `${JSON.stringify(data)} uploaded to Azure` }).pipe(
      tap(({ message }) => console.log(message)),
    );
  }
}
