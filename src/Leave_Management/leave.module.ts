import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './leave.schema';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Leave.name, schema: LeaveSchema }])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
