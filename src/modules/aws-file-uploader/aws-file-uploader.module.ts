import { Module } from '@nestjs/common';

import { AWS_FILE_UPLOADER_TOKEN } from '../../core/tokens';
import { AwsFileUploaderService } from './aws-file-uploader.service';

@Module({
  providers: [
    AwsFileUploaderService,
    {
      provide: AWS_FILE_UPLOADER_TOKEN,
      useExisting: AwsFileUploaderService,
    },
  ],
  exports: [AWS_FILE_UPLOADER_TOKEN],
})
export class AwsFileUploaderModule {}
