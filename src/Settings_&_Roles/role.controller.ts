import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    return { total: roles.length, roles };
  }

  @Post()
  async create(@Body() body: { name: string; description?: string }) {
    const role = await this.roleService.create(body.name, body.description);
    return { message: 'Role created', role };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string; description?: string }) {
    const role = await this.roleService.update(id, body);
    return { message: 'Role updated', role };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
