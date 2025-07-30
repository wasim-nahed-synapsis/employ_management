import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaveDocument = Leave & Document;

@Schema({ timestamps: true })
export class Leave {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  days: number;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop({ required: true })
  fromDate: Date;

  @Prop({ required: true })
  toDate: Date;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
