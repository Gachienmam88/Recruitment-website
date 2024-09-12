import { IsArray, IsMongoId, IsNotEmpty } from "class-validator"
import mongoose from "mongoose"

export class CreateRoleDto {

  @IsNotEmpty({message:"Tên  không được để trống !"})
  name:string

  
  @IsNotEmpty({message:"Mô tả không được để trống ! "})
  description:string

  
  @IsNotEmpty({message:" Trạng thái không được để trống !"})
  isActive:boolean

  @IsArray({message:"Vui lòng truyền vào mảng"})
  @IsMongoId({each:true,message:'Mỗi phần tử phải là 1 objectId'})
  @IsNotEmpty({message:"Permissions không được để trống"})
  permissions:mongoose.Schema.Types.ObjectId[]
  
}
