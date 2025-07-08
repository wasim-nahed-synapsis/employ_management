import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.schema';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() body: Partial<Employee>) {
    const emp = await this.employeeService.create(body);
    return { message: 'Employee created successfully', employee: emp };
  }

  @Get()
  async findAll() {
    const employees = await this.employeeService.findAll();
    return { total: employees.length, employees };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employee = await this.employeeService.findById(id);
    return employee;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Employee>) {
    const updated = await this.employeeService.update(id, body);
    return { message: 'Employee updated successfully', employee: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
