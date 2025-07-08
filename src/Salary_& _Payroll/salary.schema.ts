import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalaryDocument = Salary & Document;

@Schema({ timestamps: true })
export class Salary {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  month: string; // e.g., 'July 2025'

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  paidDate: Date;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
