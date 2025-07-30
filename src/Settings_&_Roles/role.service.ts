import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.schema';
import { Model } from 'mongoose';
import { UpdateRoleDto } from 'src/dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

  async create(name: string, description?: string): Promise<Role> {
    const role = new this.roleModel({ name, description });
    return role.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().sort({ name: 1 }).exec();
  }

  // async update(id: string, updateData: Partial<Role>): Promise<Role> {
  //   const updated = await this.roleModel.findByIdAndUpdate(id, updateData, { new: true });
  //   if (!updated) throw new NotFoundException('Role not found');
  //   return updated;
  // }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    return await this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.roleModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Role not found');
    return { message: 'Role deleted successfully' };
  }
}
