import { DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';

import {
  AWS_FILE_UPLOADER_TOKEN,
  AZURE_FILE_UPLOADER_TOKEN,
  FILE_UPLOADERS_TOKEN,
  FILE_UPLOADER_TOKEN,
  GCP_FILE_UPLOADER_TOKEN,
} from '../../core/tokens';
import { AwsFileUploaderModule } from '../aws-file-uploader/aws-file-uploader.module';
import { AzureFileUploaderModule } from '../azure-file-uploader/azure-file-uploader.module';
import { GcpFileUploaderModule } from '../gcp-file-uploader/gcp-file-uploader.module';
import { CloudFileUploaderService } from './cloud-file-uploader.service';

type CloudProviders = {
  aws?: boolean;
  azure?: boolean;
  gcp?: boolean;
};

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class CloudFileUploaderModule {
  static withArray(modules: Array<Type<any>>): DynamicModule {
    const tokens = modules
      .map((module) => Reflect.getMetadata(MODULE_METADATA.EXPORTS, module))
      .reduce((prev, curr) => [...prev, ...curr], []);

    return {
      module: CloudFileUploaderModule,
      imports: [...modules],
      providers: [
        CloudFileUploaderService,
        { provide: FILE_UPLOADER_TOKEN, useExisting: CloudFileUploaderService },
        {
          provide: FILE_UPLOADERS_TOKEN,
          useFactory: (...providers) => providers,
          inject: tokens,
        },
      ],
      exports: [FILE_UPLOADER_TOKEN],
    };
  }

  static withInfrastructure(
    infrastructure: ModuleMetadata['imports'],
    tokens: symbol[],
  ): DynamicModule {
    infrastructure = infrastructure ?? [];

    return {
      module: CloudFileUploaderModule,
      imports: [...infrastructure],
      providers: [
        CloudFileUploaderService,
        { provide: FILE_UPLOADER_TOKEN, useExisting: CloudFileUploaderService },
        {
          provide: FILE_UPLOADERS_TOKEN,
          useFactory: (...providers) => providers,
          inject: [...tokens],
        },
      ],
      exports: [FILE_UPLOADER_TOKEN],
    };
  }

  static withMap({
    aws = false,
    azure = false,
    gcp = false,
  }: CloudProviders): DynamicModule {
    let infrastructure: ModuleMetadata['imports'] = [];
    let tokens: symbol[] = [];

    if (aws) {
      infrastructure = [...infrastructure, AwsFileUploaderModule];
      tokens = [...tokens, AWS_FILE_UPLOADER_TOKEN];
    }

    if (azure) {
      infrastructure = [...infrastructure, AzureFileUploaderModule];
      tokens = [...tokens, AZURE_FILE_UPLOADER_TOKEN];
    }

    if (gcp) {
      infrastructure = [...infrastructure, GcpFileUploaderModule];
      tokens = [...tokens, GCP_FILE_UPLOADER_TOKEN];
    }

    return {
      module: CloudFileUploaderModule,
      imports: [...infrastructure],
      providers: [
        CloudFileUploaderService,
        { provide: FILE_UPLOADER_TOKEN, useExisting: CloudFileUploaderService },
        {
          provide: FILE_UPLOADERS_TOKEN,
          useFactory: (...providers) => providers,
          inject: tokens,
        },
      ],
      exports: [FILE_UPLOADER_TOKEN],
    };
  }
}
