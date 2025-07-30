import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalaryDocument = Salary & Document;

@Schema({ timestamps: true })
export class Salary extends Document {
  @Prop({ required: true })
  employeeName: string;

  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  department: string;

  @Prop()
  basicSalary: number;

  @Prop()
  allowances: number;

  @Prop()
  deductions: number;

  @Prop()
  amount: number;

  @Prop()
  month: string;

  @Prop()
  isPaid: boolean;

  @Prop()
  paidDate: Date;

  @Prop()
  payDate: Date;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
