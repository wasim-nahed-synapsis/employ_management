import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('generate')
  async generate(@Body() body: { employeeId: string, amount: number, month: string }) {
    const salary = await this.salaryService.generate(body.employeeId, body.amount, body.month);
    return { message: 'Salary generated', salary };
  }

  @Get(':employeeId')
  async getSlip(@Param('employeeId') employeeId: string) {
    const salary = await this.salaryService.getCurrentSlip(employeeId);
    return salary;
  }

  @Get('history/:employeeId')
  async getHistory(@Param('employeeId') employeeId: string) {
    const history = await this.salaryService.getHistory(employeeId);
    return { total: history.length, history };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<any>) {
    const updated = await this.salaryService.updateSalary(id, body);
    return { message: 'Salary updated', salary: updated };
  }
}
