import { Inject, Injectable } from '@nestjs/common';
import { concat, Observable } from 'rxjs';

import {
  FileUploader,
  FILE_UPLOADERS_TOKEN,
  UploadFileRequest,
  UploadFileResponse,
} from '../../core/tokens';

@Injectable()
export class CloudFileUploaderService implements FileUploader {
  constructor(
    @Inject(FILE_UPLOADERS_TOKEN)
    private readonly fileUploaders: FileUploader[],
  ) {}

  uploadFile(params: UploadFileRequest): Observable<UploadFileResponse> {
    const observables = this.fileUploaders.map((uploader) =>
      uploader.uploadFile(params),
    );
    return concat(...observables);
  }
}
