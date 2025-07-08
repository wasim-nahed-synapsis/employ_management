import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ default: Date.now })
  checkInTime: Date;

  @Prop()
  checkOutTime: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
