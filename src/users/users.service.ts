import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import {genSaltSync,hashSync,compareSync} from 'bcryptjs'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sample';
@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel:SoftDeleteModel<UserDocument>,
  @InjectModel(Role.name) private roleModel:SoftDeleteModel<RoleDocument>
){}

  hashPassword=(password:string)=>{
    const salt = genSaltSync(10)
    const hash=hashSync(password,salt)
    return hash;
  }
 async create(createUserDto:CreateUserDto,user:IUser) {
    try {
      const hashPassword = this.hashPassword(createUserDto.password)
      // check duplicate email
    const isExist=await this.userModel.findOne({email:createUserDto.email})
    if(isExist){
      throw new BadRequestException(`Không được trùng email ${createUserDto.email} nhé !`)
    }
      const newUser=await this.userModel.create({
        ...createUserDto,password:hashPassword,createdBy:{
        _id:user._id,
        email:user.email
      }
    })
    return newUser
    } catch (error) {
      if (error.code === 11000) { // Mã lỗi 11000 là do MongoDB phát sinh khi trùng lặp
        throw new ConflictException('Email đã tồn tại');
      } else {
        throw new InternalServerErrorException('Lỗi hệ thống, vui lòng thử lại sau');
      }
    }
  }

  async findAll(currentPage:number , limit:number , qs:any) {
    const { filter, sort ,  projection, population } = aqp(qs);
    delete filter.current
    delete filter.pageSize

    const offset=(+currentPage-1)*(+limit)
    const defaultLimit = +limit ? +limit : 10

    const totalItems= (await this.userModel.find(filter)).length
    const totalPages  = Math.ceil(totalItems/defaultLimit)
    
    // if(isEmpty(sort)){
    //   sort  = '-Updated at'
    // }
    const result = await this.userModel.find(filter)
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
      const user = await this.userModel.findOne({
        _id:id
      }).populate({path:'role',select:{name:1,_id:1}})
      if(user===null){
        throw new BadRequestException("Không tìm thấy user")
      }
      return user
    } catch (error) {
      throw error
    }
  }
  async findOneByUsername(username:string){
    try {
      const user = await this.userModel.findOne({
        email:username
      }).populate({path:"role",select:{name:1}})
      return user
    } catch (error) {
      throw error
    }
  }
  
  async update(id: string, updateUserDto: UpdateUserDto, user:IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      return await this.userModel.updateOne({_id:id},{...updateUserDto , updatedBy:{
        _id:user._id,
        email:user.email
      }}) 
    } catch (error) {
      return "Cập nhật thất bại"
    }
  }

  async remove(id: string,user:IUser) {
    //admin@gmail.com
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException("Không tìm thấy id !")
      }
      const foundUser=await this.userModel.findById({id})
      if(foundUser?.email==="admin@gmail.com"){
        throw new BadRequestException("Không thể xóa tài khoản admin@gmail.com")
      }
      const userToDelete=await this.userModel.findOne({_id:id})
      await userToDelete?.updateOne({_id:id},{...userToDelete,deletedBy:{
        _id:user._id,
        email:user.email
      }})
      return await this.userModel.softDelete({_id:id})
    } catch (error) {
      throw error
    } 
  }
  async checkUserPassword(password:string,hash:string){
    return compareSync(password,hash)
  }
  async register(user:RegisterUserDto){
    const {
      name,email,password,age,gender,address
    }=user
    // check duplicate email
    const isExist=await this.userModel.findOne({email})
    if(isExist){
      throw new BadRequestException(`Không được trùng email ${email} nhé !`)
    }
    const hashPassword=this.hashPassword(password)

    //Fetch user role
    const userRole=await this.roleModel.findOne({name:USER_ROLE})
    const newRegister=await this.userModel.create({
      name,email,password:hashPassword,age,gender,address,role:userRole?._id
    })
    return newRegister; 
  }
  async updateUserToken(refreshToken:string,_id:string){
    return this.userModel.updateOne({
      _id
    } , {
      refreshToken : refreshToken
    }) 
  }
  async findUserByToken(refreshToken:string){
    try {
      const user=await this.userModel.findOne({refreshToken}).populate({
        path:"role",
        select:{name:1}
      })
      return user;
    } catch (error) {
      throw new BadRequestException("Token không đúng định  dạng ,  vui lòng đăng nhập lại để sử dụng token !")
    }
  }
  
}
 
 
