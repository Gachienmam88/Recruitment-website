import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { PermissionDocument } from './schemas/permission.schema';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel('Permission') private readonly permissionModel:SoftDeleteModel<PermissionDocument> ){}
  async create(createPermissionDto: CreatePermissionDto,user:IUser) {
    try {
      const exsistPermisison=await this.permissionModel.findOne({apiPath:createPermissionDto.apiPath,method:createPermissionDto.method})
      if(exsistPermisison!==null){
        throw new BadRequestException(`Phương thức ${createPermissionDto.method} và đường dẫn ${createPermissionDto.apiPath} này đã tồn tại , vui lòng thử lại !`)
      }
      return await this.permissionModel.create({...createPermissionDto,createdBy:{
        _id:user._id,email:user.email
      }})
    } catch (error) {
      throw error;
    }
  }

  
    async findAll(currentPage:number , limit:number , qs:any) {
      const { filter, sort ,  projection, population } = aqp(qs);
      delete filter.current
      delete filter.pageSize
  
      const offset=(+currentPage-1)*(+limit)
      const defaultLimit = +limit ? +limit : 10
  
      const totalItems= (await this.permissionModel.find(filter)).length
      const totalPages  = Math.ceil(totalItems/defaultLimit)
      
      // if(isEmpty(sort)){
      //   sort  = '-Updated at'
      // }
      const result = await this.permissionModel.find(filter)
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
      const job = await this.permissionModel.findOne({
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
    }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto,user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      if(updatePermissionDto.apiPath || updatePermissionDto.method){
        const exsistPermisison=await this.permissionModel.findOne({_id:{$ne:{id}},apiPath:updatePermissionDto?.apiPath,method:updatePermissionDto?.method})
        if(exsistPermisison!==null){
        throw new BadRequestException(`Phương thức ${updatePermissionDto?.method} và đường dẫn ${updatePermissionDto?.apiPath} này đã tồn tại , vui lòng thử lại !`)
      }
      }
      return await this.permissionModel.updateOne({_id:id},{...updatePermissionDto , updatedBy:{
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

  async remove(id:string,user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      const userToDelete=await this.permissionModel.findOne({_id:id})
      await userToDelete?.updateOne({_id:id},{...userToDelete,deletedBy:{
        _id:user._id,
        email:user.email
      }})
      return await this.permissionModel.softDelete({_id:id})
    } catch (error) {
      throw error;
    } 
  }
  }

