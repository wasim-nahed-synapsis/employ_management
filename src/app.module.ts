import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceModule } from './attendance/attendance.module';
import { SalaryModule } from './Salary_& _Payroll/salary.module';
import { LeaveModule } from './Leave_Management/leave.module';
import { DashboardModule } from './Dashboard_&_Reports/dashboard.module';
import { ReportsModule } from './Dashboard_&_Reports/reports.module';
import { RoleModule } from './Settings_&_Roles/role.module';
import { DocumentModule } from './Document_Upload/document.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    AuthModule,
    EmployeeModule,
    AttendanceModule,
    SalaryModule,
    LeaveModule,
    DashboardModule,
    ReportsModule,
    RoleModule,
    DocumentModule,
  ],
})
export class AppModule {}
