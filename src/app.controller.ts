import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  FileUploader,
  FILE_UPLOADER_TOKEN,
  UploadFileResponse,
} from './core/tokens';

@Controller()
export class AppController {
  constructor(
    @Inject(FILE_UPLOADER_TOKEN)
    private readonly fileUploaders: FileUploader,
  ) {}

  @Post()
  uploadFile(@Body() body: unknown): Observable<UploadFileResponse> {
    return this.fileUploaders.uploadFile(body);
  }
}
