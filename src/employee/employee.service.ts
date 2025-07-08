import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>
  ) {}

  async create(data: Partial<Employee>): Promise<EmployeeDocument> {
    const newEmployee = new this.employeeModel(data);
    return newEmployee.save();
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find().exec();
  }

  async findById(id: string): Promise<EmployeeDocument> {
    const employee = await this.employeeModel.findById(id);
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, data: Partial<Employee>): Promise<EmployeeDocument> {
    const updated = await this.employeeModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Employee not found');
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const res = await this.employeeModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Employee not found');
    return { message: 'Employee deleted successfully' };
  }
}
