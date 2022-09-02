import { Module } from '@nestjs/common';
import { GCP_FILE_UPLOADER_TOKEN } from '../../core/tokens';

import { GCPFileUploaderService } from './gcp-file-uploader.service';

@Module({
  providers: [
    GCPFileUploaderService,
    {
      provide: GCP_FILE_UPLOADER_TOKEN,
      useExisting: GCPFileUploaderService,
    },
  ],
  exports: [GCP_FILE_UPLOADER_TOKEN],
})
export class GcpFileUploaderModule {}
