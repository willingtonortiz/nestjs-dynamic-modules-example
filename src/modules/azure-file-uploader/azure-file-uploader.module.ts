import { Module } from '@nestjs/common';

import { AZURE_FILE_UPLOADER_TOKEN } from '../../core/tokens';
import { AzureFileUploaderService } from './azure-file-uploader.service';

@Module({
  providers: [
    AzureFileUploaderService,
    {
      provide: AZURE_FILE_UPLOADER_TOKEN,
      useExisting: AzureFileUploaderService,
    },
  ],
  exports: [AZURE_FILE_UPLOADER_TOKEN],
})
export class AzureFileUploaderModule {}
