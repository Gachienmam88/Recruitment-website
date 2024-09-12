import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('api/v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  
  @ResponseMessage("Tạo mới một role")
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto ,@User() user:IUser) {
    return await  this.rolesService.create(createRoleDto,user);
  }

  @ResponseMessage("Lấy toàn bộ role với phân trang")
  @Get()
  async findAll(@Query("current") currentPage:string, @Query("pageSize") limit:string, @Query() qs:any ) {
    return await this.rolesService.findAll(+currentPage,+limit,qs);
  }

  @ResponseMessage("Lấy thông tin một role theo id")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.rolesService.findOne(id);
  }

  @ResponseMessage("Cập nhật một role")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto ,@User() user:IUser) {
    return await  this.rolesService.update(id, updateRoleDto,user);
  }

  @ResponseMessage("Xóa một role")
  @Delete(':id')
  async remove(@Param('id') id: string,@User() user:IUser) {
    return await  this.rolesService.remove(id,user);
  }
}
