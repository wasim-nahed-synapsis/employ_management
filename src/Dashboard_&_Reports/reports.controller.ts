import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from '../attendance/attendance.schema';
import { Model } from 'mongoose';
import { Salary } from 'src/Salary_& _Payroll/salary.schema';

@Controller('reports')
export class ReportsController {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
    @InjectModel(Salary.name) private salaryModel: Model<Salary>
  ) {}

  @Get('attendance')
  async attendanceReport() {
    const records = await this.attendanceModel.find().sort({ checkInTime: -1 });
    return {
      total: records.length,
      report: records,
    };
  }

  @Get('salary')
  async salaryReport() {
    const records = await this.salaryModel.find().sort({ month: -1 });
    return {
      total: records.length,
      report: records,
    };
  }
}
