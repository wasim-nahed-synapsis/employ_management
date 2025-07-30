import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  maritalStatus: string;

  @IsNotEmpty()
  designation: string;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  salary: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;

  image?: string;
}
