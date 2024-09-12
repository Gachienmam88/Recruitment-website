
import { Response } from './../core/transform.interceptor';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('api/v1/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  @ResponseMessage("Tạo mới công việc")
  @Post()
  async create(@Body() createJobDto: CreateJobDto , @User() user:IUser) {
    const newJob=await  this.jobsService.create(createJobDto,user);
    return {
      _id:newJob._id,
      createAt:newJob.createdAt
    }
  }

  @Public()
  @ResponseMessage("Lấy job theo trang")
  @Get()
  findAll(@Query("current") currentPage:string,
  @Query("pageSize") limit:string,
  @Query() qs:string) {
    return this.jobsService.findAll(+currentPage,+limit,qs);
  }


  @Public()
  @ResponseMessage("Lấy thông tin job theo id ")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.jobsService.findOne(id);
  }

  @ResponseMessage("Cập nhật công việc mới nhất ")
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto , @User() user:IUser) {
    return await this.jobsService.update(id, updateJobDto,user);
  }

  @ResponseMessage("Xoá công việc theo id ")
  @Delete(':id')
  remove(@Param('id') id: string , @User() user:IUser) {
    return this.jobsService.remove(id,user);
  }
}
