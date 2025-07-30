import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  image?: string;
}


export const EmployeeSchema = SchemaFactory.createForClass(Employee);
