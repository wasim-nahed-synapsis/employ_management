import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  async checkIn(@Body() body: { employeeId: string }) {
    const attendance = await this.attendanceService.checkIn(body.employeeId);
    return { message: 'Check-in successful', data: attendance };
  }

  @Post('checkout')
  async checkOut(@Body() body: { employeeId: string }) {
    const attendance = await this.attendanceService.checkOut(body.employeeId);
    return { message: 'Check-out successful', data: attendance };
  }

  @Get(':employeeId')
  async getHistory(@Param('employeeId') employeeId: string) {
    const history = await this.attendanceService.getHistory(employeeId);
    return { employeeId, total: history.length, history };
  }

  @Get()
  async getReport() {
    const report = await this.attendanceService.getReport();
    return { total: report.length, report };
  }
}
