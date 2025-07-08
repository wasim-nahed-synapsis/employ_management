import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocumentFile = EmployeeDocument & Document;

@Schema({ timestamps: true })
export class EmployeeDocument {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  filename: string;

  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop()
  path: string;
}

export const EmployeeDocumentSchema = SchemaFactory.createForClass(EmployeeDocument);
