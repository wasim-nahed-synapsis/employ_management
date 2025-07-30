import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.schema';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createEmployee(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateEmployeeDto
  ) {
    console.log(body);
    console.log(file);
    return this.employeeService.create(body, file);
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

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() body: Partial<Employee>) {
  //   const updated = await this.employeeService.update(id, body);
  //   return { message: 'Employee updated successfully', employee: updated };
  // }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: string, @UploadedFile() file, @Body() body) {
    const imagePath = file ? `uploads/${file.filename}` : body.image;
    return this.employeeService.update(id, { ...body, image: imagePath });
  }


  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.employeeService.delete(id);
  // }
  
  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }


}
