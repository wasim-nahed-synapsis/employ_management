import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeDocument, EmployeeDocumentFile } from './document.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';

@Injectable()
export class DocumentService {
    constructor(@InjectModel(EmployeeDocument.name) private docModel: Model<EmployeeDocumentFile>) { }

    async upload(employeeId: string, file: Express.Multer.File) {
        const doc = new this.docModel({
            employeeId,
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            path: file.path,
        });
        return doc.save();
    }

    async getDocuments(employeeId: string) {
        return this.docModel.find({ employeeId }).sort({ createdAt: -1 });
    }

    async deleteDocument(docId: string) {
        const doc = await this.docModel.findById(docId);
        if (!doc) throw new NotFoundException('Document not found');

        // File delete korar age check koro
        try {
            if (fs.existsSync(doc.path)) {
                fs.unlinkSync(doc.path);
            }
        } catch (err) {
            console.error('File delete error:', err);
        }

        await this.docModel.deleteOne({ _id: doc._id });

        return { message: 'Document deleted successfully' };
    }
}
