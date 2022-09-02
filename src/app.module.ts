import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AwsFileUploaderModule } from './modules/aws-file-uploader/aws-file-uploader.module';
import { AzureFileUploaderModule } from './modules/azure-file-uploader/azure-file-uploader.module';
import { CloudFileUploaderModule } from './modules/cloud-file-uploader/cloud-file-uploader.module';
import { GcpFileUploaderModule } from './modules/gcp-file-uploader/gcp-file-uploader.module';

@Module({
  imports: [
    CloudFileUploaderModule.withArray([
      AwsFileUploaderModule,
      AzureFileUploaderModule,
      GcpFileUploaderModule,
    ]),
    //   aws: true,
    //   azure: true,
    //   gcp: true,
    // }),
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

// CloudFileUploaderModule.withMap({
