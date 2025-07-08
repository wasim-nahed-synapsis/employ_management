import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Leave, LeaveDocument } from './leave.schema';
import { Model } from 'mongoose';

@Injectable()
export class LeaveService {
  constructor(@InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>) {}

  async applyLeave(data: Partial<Leave>): Promise<LeaveDocument> {
    const leave = new this.leaveModel(data);
    return leave.save();
  }

  async getLeavesByEmployee(employeeId: string): Promise<LeaveDocument[]> {
    return this.leaveModel.find({ employeeId }).sort({ createdAt: -1 });
  }

  async approveLeave(id: string): Promise<LeaveDocument> {
    const leave = await this.leaveModel.findById(id);
    if (!leave) throw new NotFoundException('Leave not found');
    leave.status = 'approved';
    return leave.save();
  }

  async rejectLeave(id: string): Promise<LeaveDocument> {
    const leave = await this.leaveModel.findById(id);
    if (!leave) throw new NotFoundException('Leave not found');
    leave.status = 'rejected';
    return leave.save();
  }
}
