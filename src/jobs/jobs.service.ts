import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { JobDocument } from './schemas/job.shema';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private readonly jobModel:SoftDeleteModel<JobDocument> ){}

  
  
  async create(createJobDto: CreateJobDto ,user:IUser) {
    try {
      const newJob=await this.jobModel.create({...createJobDto,createdBy:{
        _id:user._id,
        email:user.email
      }})
      return newJob;
    } catch (error) {
      throw new InternalServerErrorException("Lỗi hệ thống , vui lòng thử lại sau  !")
    }
    
  }

  async findAll(currentPage:number , limit:number , qs:any) {
    const { filter, sort ,  projection, population } = aqp(qs);
    delete filter.current
    delete filter.pageSize

    const offset=(+currentPage-1)*(+limit)
    const defaultLimit = +limit ? +limit : 10

    const totalItems= (await this.jobModel.find(filter)).length
    const totalPages  = Math.ceil(totalItems/defaultLimit)
    
    // if(isEmpty(sort)){
    //   sort  = '-Updated at'
    // }
    const result = await this.jobModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any) //any everywhere 
    .select("-password")
    .populate(population)
    .exec()
   
    
    return {
      meta:{
        current:currentPage,
        pageSize:limit,
        pages:totalPages,
      },
      result //kết quả query
    }
  }

  async findOne(id: string) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      const job = await this.jobModel.findOne({
        _id:id
      })
      if(job===null){
        throw new BadRequestException("Không tìm thấy user")
      }
      return job
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Ném lại lỗi HTTP đã ném trước đó
      }
      throw new InternalServerErrorException("Đã có lỗi xảy ra ? !")
    }
  }

  async update(id:string, updateJobDto: UpdateJobDto , user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      return await this.jobModel.updateOne({_id:id},{...updateJobDto , updatedBy:{
        _id:user._id,
        email:user.email
      }}) 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Ném lại lỗi HTTP đã ném trước đó
      }
      throw new InternalServerErrorException("Lỗi hệ thống , vui lòng thử lại sau !")
    }
  }

  async remove(id:string , user:IUser) {
    try {if(!mongoose.Types.ObjectId.isValid(id)){
      throw new BadRequestException("Không tìm thấy id !")
    }
      const userToDelete=await this.jobModel.findOne({_id:id})
      await userToDelete?.updateOne({_id:id},{...userToDelete,deletedBy:{
        _id:user._id,
        email:user.email
      }})
      return await this.jobModel.softDelete({_id:id})
    } catch (error) {
      throw new InternalServerErrorException("Lỗi hệ thống vui lòng thử lại sau !")
    } 
  }
}
