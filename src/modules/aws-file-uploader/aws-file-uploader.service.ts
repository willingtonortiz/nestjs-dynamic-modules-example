import { Injectable } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

import {
  FileUploader,
  UploadFileRequest,
  UploadFileResponse,
} from '../../core/tokens';

@Injectable()
export class AwsFileUploaderService implements FileUploader {
  uploadFile(data: UploadFileRequest): Observable<UploadFileResponse> {
    return of({ message: `${JSON.stringify(data)} uploaded to AWS` }).pipe(
      tap(({ message }) => console.log(message)),
    );
  }
}
