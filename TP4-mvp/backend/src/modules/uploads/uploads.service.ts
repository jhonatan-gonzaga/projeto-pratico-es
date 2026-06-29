import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  buildImageResponse(file: Express.Multer.File, hostUrl: string) {
    if (!file) {
      throw new BadRequestException('Imagem nao enviada.');
    }

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `${hostUrl}/uploads/images/${file.filename}`,
    };
  }

  buildAudioResponse(file: Express.Multer.File, hostUrl: string) {
    if (!file) {
      throw new BadRequestException('Audio nao enviado.');
    }

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `${hostUrl}/uploads/audio/${file.filename}`,
    };
  }
}
