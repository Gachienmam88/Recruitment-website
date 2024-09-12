import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('api/v1/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ResponseMessage("Thêm một quyền hạn ")
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto , @User() user:IUser) {
    return await  this.permissionsService.create(createPermissionDto,user);
  }

  @ResponseMessage("Lấy tất cả quyền hạn theo trang  ")
  @Get()
  async findAll(@Query("current") currentPage:string, @Query("pageSize") limit:string, @Query() qs:any  ) {
    return await  this.permissionsService.findAll(+currentPage,+limit,qs);
  }

  @ResponseMessage("Lấy dữ liệu quyền hạn theo id ")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.permissionsService.findOne(id);
  }

  @ResponseMessage("Cập nhật một quyền hạn ")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto , @User() user:IUser) {
    return this.permissionsService.update(id, updatePermissionDto,user);
  }

  @ResponseMessage("Xóa một quyền hạn ")
  @Delete(':id')
  async remove(@Param('id') id: string , @User() user:IUser) {
    return await  this.permissionsService.remove(id,user);
  }
}
