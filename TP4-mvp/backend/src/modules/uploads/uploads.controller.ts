import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadsService } from './uploads.service';

const imageStorage = diskStorage({
  destination: join(process.cwd(), 'uploads', 'images'),
  filename: (_req, file, callback) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${unique}${extname(file.originalname).toLowerCase()}`);
  },
});

const audioStorage = diskStorage({
  destination: join(process.cwd(), 'uploads', 'audio'),
  filename: (_req, file, callback) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${unique}${extname(file.originalname).toLowerCase()}`);
  },
});

function imageFileFilter(
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!file.mimetype.startsWith('image/')) {
    callback(new BadRequestException('Envie apenas arquivos de imagem.'), false);
    return;
  }

  callback(null, true);
}

function audioFileFilter(
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!file.mimetype.startsWith('audio/')) {
    callback(new BadRequestException('Envie apenas arquivos de audio.'), false);
    return;
  }

  callback(null, true);
}

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: imageStorage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    const protocol = request.protocol;
    const host = request.get('host');
    return this.uploadsService.buildImageResponse(file, `${protocol}://${host}`);
  }

  @Post('audio')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: audioStorage,
      fileFilter: audioFileFilter,
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  uploadAudio(@UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    const protocol = request.protocol;
    const host = request.get('host');
    return this.uploadsService.buildAudioResponse(file, `${protocol}://${host}`);
  }
}
