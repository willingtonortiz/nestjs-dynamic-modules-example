import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CloudFileUploaderModule } from './modules/cloud-file-uploader/cloud-file-uploader.module';

@Module({
  imports: [
    CloudFileUploaderModule.withMap({
      aws: true,
      azure: true,
      gcp: true,
    }),
    // CloudFileUploaderModule.withInfrastructure(
    //   [AwsFileUploaderModule, AzureFileUploaderModule, GcpFileUploaderModule],
    //   [
    //     AWS_FILE_UPLOADER_TOKEN,
    //     AZURE_FILE_UPLOADER_TOKEN,
    //     GCP_FILE_UPLOADER_TOKEN,
    //   ],
    // ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
