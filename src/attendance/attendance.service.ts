import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, AttendanceDocument } from './attendance.schema';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async checkIn(employeeId: string): Promise<AttendanceDocument> {
    return new this.attendanceModel({ employeeId }).save();
  }

  async checkOut(employeeId: string): Promise<AttendanceDocument> {
    const latest = await this.attendanceModel
      .findOne({ employeeId, checkOutTime: null })
      .sort({ checkInTime: -1 });

    if (!latest) {
      throw new NotFoundException('No active check-in found.');
    }

    latest.checkOutTime = new Date();
    return latest.save();
  }

  async getHistory(employeeId: string): Promise<AttendanceDocument[]> {
    return this.attendanceModel.find({ employeeId }).sort({ checkInTime: -1 }).exec();
  }

  async getReport(): Promise<AttendanceDocument[]> {
    return this.attendanceModel.find().sort({ checkInTime: -1 }).exec();
  }
}
