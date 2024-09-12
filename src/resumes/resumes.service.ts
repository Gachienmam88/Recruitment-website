
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ResumeDocument } from './schemas/resume.schema';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {
  constructor(@InjectModel('Resume') private readonly resumeModel:SoftDeleteModel<ResumeDocument> ){}
  async create(createResumeDto: CreateUserCvDto , user:IUser) {
    try {
      return await this.resumeModel.create({
        ...createResumeDto,email:user.email,userId:user._id,status:"PENDING",history:[{updatedAt:new Date(),updatedBy:{_id:user._id,email:user.email},status:"PENDING"}],createdBy:{_id:user._id,email:user.email}
      })
    } catch (error) {
      
    }
  }

  async findAll(currentPage:number , limit:number , qs:any) {
    const { filter, sort ,  projection, population } = aqp(qs);
    delete filter.current
    delete filter.pageSize

    const offset=(+currentPage-1)*(+limit)
    const defaultLimit = +limit ? +limit : 10

    const totalItems= (await this.resumeModel.find(filter)).length
    const totalPages  = Math.ceil(totalItems/defaultLimit)
    
    // if(isEmpty(sort)){
    //   sort  = '-Updated at'
    // }
    const result = await this.resumeModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any) //any everywhere 
    .select (projection as any)
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
      return await this.resumeModel.findOne({_id:id})
    } catch (error) {
      
    }
  }

  async update(id: string, updateResumeDto: UpdateResumeDto , user:IUser) {
    try {
      const resume = await this.resumeModel.findOne({_id:id})
      if (!resume) {
        throw new BadRequestException('Không tìm thấy resume !');
      }
      return await this.resumeModel.updateOne({_id:id},{
        ...updateResumeDto,updatedBy:{
          _id:user._id,email:user.email
        },history:[...resume?.history,{status:updateResumeDto?.status,updatedAt:new Date(),updatedBy:{_id:user._id,email:user.email}}]
      })
    } catch (error) {
      
    }
  }

  async remove(id: string,user:IUser) {
    try {
      await this.resumeModel.updateOne({_id:id},{deletedBy:{
        _id:user._id,email:user.email
      }})
      return this.resumeModel.softDelete({_id:id})
    } catch (error) {
      
    } 
  }

  async getByUser(user:IUser){
    try {
      return await this.resumeModel.find({userId:user._id}).sort("-createdAt")
      .populate([
        {path:"companyId",
          select:{name:1}
        },
        {
          path:"jobId",
          select:{name:1}
        }
      ])
    } catch (error) {
      
    }
  }
}
