import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Salary, SalaryDocument } from './salary.schema';
import { Model } from 'mongoose';

@Injectable()
export class SalaryService {
  constructor(@InjectModel(Salary.name) private salaryModel: Model<SalaryDocument>) {}

  async generate(employeeId: string, amount: number, month: string): Promise<SalaryDocument> {
    const salary = new this.salaryModel({ employeeId, amount, month, isPaid: true, paidDate: new Date() });
    return salary.save();
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
