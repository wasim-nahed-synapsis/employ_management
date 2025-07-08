import {
  Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class DocumentController {
  constructor(private readonly docService: DocumentService) {}

  @Post('employees/:id/documents')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
      }
    })
  }))
  async uploadFile(@Param('id') employeeId: string, @UploadedFile() file: Express.Multer.File) {
    const doc = await this.docService.upload(employeeId, file);
    return { message: 'Document uploaded', doc };
  }

  @Get('employees/:id/documents')
  async getDocs(@Param('id') employeeId: string) {
    const docs = await this.docService.getDocuments(employeeId);
    return { total: docs.length, docs };
  }

  @Delete('documents/:docId')
  async delete(@Param('docId') docId: string) {
    return this.docService.deleteDocument(docId);
  }
}
