import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from '../attendance/attendance.schema';
import { Salary, SalarySchema } from 'src/Salary_& _Payroll/salary.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
      { name: Salary.name, schema: SalarySchema },
    ]),
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
