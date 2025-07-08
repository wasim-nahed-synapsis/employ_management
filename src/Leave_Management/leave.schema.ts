import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaveDocument = Leave & Document;

@Schema({ timestamps: true })
export class Leave {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  fromDate: Date;

  @Prop({ required: true })
  toDate: Date;

  @Prop({ default: 'pending' }) // approved / rejected / pending
  status: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
