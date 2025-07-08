import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salary, SalarySchema } from './salary.schema';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Salary.name, schema: SalarySchema }])],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
