import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../employee/employee.schema';
import { Attendance } from '../attendance/attendance.schema';
import { Salary } from 'src/Salary_& _Payroll/salary.schema';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>
  ) {}

  @Get('stats')
  async getStats() {
    const totalEmployees = await this.employeeModel.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const presentToday = await this.attendanceModel.countDocuments({
      checkInTime: { $gte: today, $lt: tomorrow },
    });

    const absent = totalEmployees - presentToday;

    return {
      totalEmployees,
      present: presentToday,
      absent,
    };
  }
}
