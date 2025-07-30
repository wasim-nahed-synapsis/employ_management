import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { LeaveService } from './leave.service';

@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) { }

  @Post('apply')
  async apply(@Body() body: { employeeId: string, reason: string, fromDate: string, toDate: string }) {
    const leave = await this.leaveService.applyLeave({
      ...body,
      fromDate: new Date(body.fromDate),
      toDate: new Date(body.toDate),
    });
    return { message: 'Leave applied successfully', leave };
  }

  @Get()
  async getAllLeaves() {
    const leaves = await this.leaveService.getAllLeaves();
    const uniqueEmployees = new Set(leaves.map(leave => leave.employeeId));
    const approvedLeaves = leaves.filter(leave => leave.status === 'approved');
    const rejectedLeaves = leaves.filter(leave => leave.status === 'rejected');

    return {
      totalLeaves: leaves.length,
      totalEmployeesAppliedLeave: uniqueEmployees.size,
      totalApprovedLeaves: approvedLeaves.length, 
      totalRejectedLeaves: rejectedLeaves.length, 
      leaves,
    };
  }

  @Get(':employeeId')
  async getLeaves(@Param('employeeId') employeeId: string) {
    const leaves = await this.leaveService.getLeavesByEmployee(employeeId);
    return { total: leaves.length, leaves };
  }

  @Put(':id/approve')
  async approve(@Param('id') id: string) {
    const leave = await this.leaveService.approveLeave(id);
    return { message: 'Leave approved', leave };
  }

  @Put(':id/reject')
  async reject(@Param('id') id: string) {
    const leave = await this.leaveService.rejectLeave(id);
    return { message: 'Leave rejected', leave };
  }
}
