import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Salary, SalaryDocument } from './salary.schema';
import { Model } from 'mongoose';

@Injectable()
export class SalaryService {
  constructor(@InjectModel(Salary.name) private salaryModel: Model<SalaryDocument>) { }

  async generate(body: {
    employeeId: string;
    employeeName: string;
    department: string;
    basicSalary: number;
    allowances: number;
    deductions: number;
    month: string;
    payDate: Date;
  }): Promise<SalaryDocument> {
    const netAmount = body.basicSalary + body.allowances - body.deductions;

    const salary = new this.salaryModel({
      employeeId: body.employeeId,
      employeeName: body.employeeName,
      department: body.department,
      basicSalary: body.basicSalary,
      allowances: body.allowances,
      deductions: body.deductions,
      amount: netAmount,
      month: body.month,
      isPaid: true,
      paidDate: new Date(),
      payDate: body.payDate,
    });

    return salary.save();
  }

  async getAllSalaries(): Promise<SalaryDocument[]> {
    return this.salaryModel.find().sort({ createdAt: -1 }).exec();
  }

  async getCurrentSlip(employeeId: string): Promise<SalaryDocument> {
    const latest = await this.salaryModel.findOne({ employeeId }).sort({ createdAt: -1 });
    if (!latest) throw new NotFoundException('Salary not found');
    return latest;
  }

  async getHistory(employeeId: string): Promise<SalaryDocument[]> {
    return this.salaryModel.find({ employeeId }).sort({ createdAt: -1 }).exec();
  }

  async updateSalary(id: string, data: Partial<Salary>): Promise<SalaryDocument> {
    const updated = await this.salaryModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Salary not found');
    return updated;
  }
}
