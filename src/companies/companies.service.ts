import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel('Company') // Đảm bảo bạn đang inject đúng model ở đây
  private readonly CompanyModel: SoftDeleteModel<CompanyDocument> ){}
  hashPassword=(password:string)=>{
    const salt = genSaltSync(10)
    const hash=hashSync(password,salt)
    return hash;
  }
  async create( createCompanyDto: CreateCompanyDto , user:IUser) {
    const company=await this.CompanyModel.create({
      name:createCompanyDto.name,address:createCompanyDto.address,description:createCompanyDto.description,
      createdBy:{_id:user._id,email:user.email}
    })
    return company
  }

  async findAll(currentPage:number , limit:number , qs:any) {
    const { filter, sort ,  projection, population } = aqp(qs);
    delete filter.current
    delete filter.pageSize

    const offset=(+currentPage-1)*(+limit)
    const defaultLimit = +limit ? +limit : 10

    const totalItems= (await this.CompanyModel.find(filter)).length
    const totalPages  = Math.ceil(totalItems/defaultLimit)
    
    // if(isEmpty(sort)){
    //   sort  = '-Updated at'
    // }
    const result = await this.CompanyModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any) //any everywhere 
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
      return this.CompanyModel.findOne({_id:id})
    } catch (error) {
      
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto , user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      return await this.CompanyModel.updateOne({_id:id},{...updateCompanyDto,updatedBy:{_id:user._id,email:user.email}})
    } catch (error) {
      return "Update failed !"
    }
  }

  async remove(id: string, user: IUser) {
    try {
      // Kiểm tra tính hợp lệ của ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Không tìm thấy id !');
      }
  
      // Tìm tài liệu trước khi cập nhật (nếu cần)
      const companyObj = await this.CompanyModel.findById(id);
      if (!companyObj) {
        throw new Error('Company not found');
      }
  
      // Cập nhật trường deletedBy trước khi xóa mềm
      await this.CompanyModel.updateOne(
        { _id: id },
        { deletedBy: { _id: user._id, email: user.email }, deletedAt: new Date() }
      );
  
      // Xóa mềm
      return await this.CompanyModel.updateOne({ _id: id }, { isDeleted: true });
  
  
    } catch (error) {
      console.log(error);
      return { message: 'Delete failed', error: error.message };
    }
  }
}
