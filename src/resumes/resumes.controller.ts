import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('resumes')
@Controller('api/v1/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}



  @ResponseMessage("Thêm résume cho người dùng ")
  @Post()
  async create(@Body() createUserCvDto: CreateUserCvDto , @User() user:IUser) {
    return await  this.resumesService.create(createUserCvDto ,user);
  }

  @ResponseMessage("Lấy các résume theo trang ")
  @Get()
  async findAll(@Query('current') currentPage:string , @Query('pageSize') limit:string , @Query() qs:any) {
    return await  this.resumesService.findAll(+currentPage,+limit,qs);
  }

  
  @ResponseMessage("Lấy cv theo id : ")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.resumesService.findOne(id);
  }
  @ResponseMessage("Cập nhật CV bởi admin ")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto , @User() user:IUser) {
    return await  this.resumesService.update(id, updateResumeDto,user);
  }
  @ResponseMessage("Xóa CV bởi admin")
  @Delete(':id')
  async remove(@Param('id') id: string ,@User() user:IUser) {
    return await  this.resumesService.remove(id,user);
  }

  @ResponseMessage("Lấy tất cả CV của người dùng")
  @Post('by-user')
  async handleGet(@User() user:IUser){
    return await this.resumesService.getByUser(user)
  }


}
