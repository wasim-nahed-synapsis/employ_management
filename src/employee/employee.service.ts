import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './employee.schema';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>
  ) { }

  async create(dto: CreateEmployeeDto, file?: Express.Multer.File): Promise<Employee> {
    const imagePath = file ? `uploads/${file.filename}` : '';

    const newEmployee = new this.employeeModel({
      ...dto,
      image: imagePath
    });

    return await newEmployee.save();
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

  // async delete(id: string): Promise<{ message: string }> {
  //   const res = await this.employeeModel.findByIdAndDelete(id);
  //   if (!res) throw new NotFoundException('Employee not found');
  //   return { message: 'Employee deleted successfully' };
  // }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.employeeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Employee not found");
    }
    return { message: "Employee deleted successfully" };
  }


}
