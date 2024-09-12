import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RoleDocument } from './schemas/role.schema';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { ADMIN_ROLE } from 'src/databases/sample';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel:SoftDeleteModel<RoleDocument> ){}
  async create(createRoleDto: CreateRoleDto ,user:IUser) {
    try {
      const existName=await this.roleModel.findOne({name:createRoleDto.name})
      if(existName){
        throw new BadRequestException(`Tên ${createRoleDto.name} này đã tồn tại , vui lòng tạo tên khác !`)
      }
      return await this.roleModel.create({...createRoleDto,createdBy:{
        _id:user._id,
        email:user.email
      }})
    } catch (error) {
      throw error
    }
  }

  async findAll(currentPage:number , limit:number , qs:any) {
    const { filter, sort ,  projection, population } = aqp(qs);
    delete filter.current
    delete filter.pageSize

    const offset=(+currentPage-1)*(+limit)
    const defaultLimit = +limit ? +limit : 10

    const totalItems= (await this.roleModel.find(filter)).length
    const totalPages  = Math.ceil(totalItems/defaultLimit)
    
    // if(isEmpty(sort)){
    //   sort  = '-Updated at'
    // }
    const result = await this.roleModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any) //any everywhere 
    .select(projection as any)
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
      return await this.roleModel.findOne({_id:id}).populate({path:"permissions",select:{_id:1,apiPath:1,name:1,method:1,module:1}})
    } catch (error) {
      throw error
    }
  }

  async update(id:string, updateRoleDto: UpdateRoleDto,user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      // if(updateRoleDto.name){
      //   const existName=await this.roleModel.findOne({name:updateRoleDto.name})
      //   if(existName){
      //     throw new BadRequestException(`Tên ${updateRoleDto.name} này đã tồn tại , vui lòng tạo tên khác !`)
      //   }
      // }
      return await this.roleModel.updateOne({_id:id},{...updateRoleDto,updatedBy:{
        _id:user._id,
        email:user.email
      }})
    } catch (error) {
      throw error
    }
  }

  async remove(id: string, user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      const foundRole=await this.roleModel.findById(id)
      if(foundRole?.name===ADMIN_ROLE){
        throw new BadRequestException("Không thể xóa role ADMIN !")
      }
      await this.roleModel.updateOne({_id:id},{deletedBy:{
        _id:user._id,
        email:user.email
      }})
      return await this.roleModel.softDelete({_id:id})
    } catch (error) {
      throw error
    }
}
}
