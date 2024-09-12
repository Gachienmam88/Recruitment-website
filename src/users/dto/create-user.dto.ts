import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

 
class Company{
    @IsMongoId({message:"CompanyId phải là mongo Id !"})
    @IsNotEmpty({message:"Vui lòng nhập id công ty !"})
    _id:mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message:"Vui lòng nhập tên công ty !"})
    name:string
}

export class RegisterUserDto{
    @IsNotEmpty({message:"Tên không được để trống !"})
    name:string;

    @IsEmail({
        message:"Email sai định dạng !"
    })
    @IsNotEmpty({message:"Email không được để trống !"})
    email:string;

    @IsNotEmpty({message:"Mật khẩu không được để trống !"})
    password:string;

    @IsNotEmpty({message:"Tuổi không được để trống !"})
    age:number;

    @IsNotEmpty({message:"Giới tính không được để trống !"})
    gender:string;

    @IsNotEmpty({message:"Địa chỉ không được để trống !"})
    address:string;
} 


export class CreateUserDto {

    @IsNotEmpty({message:"Tên không được để trống !"})
    name:string;

    @IsEmail({},{
        message:"Email sai định dạng !"
    })
    @IsNotEmpty({message:"Email không được để trống !"})
    email:string;

    @IsNotEmpty({message:"Mật khẩu không được để trống !"})
    password:string;

    @IsNotEmpty({message:"Tuổi không được để trống !"})
    age:number;

    @IsNotEmpty({message:"Giới tính không được để trống !"})
    gender:string;

    @IsNotEmpty({message:"Địa chỉ không được để trống !"})
    address:string;
    
    @IsMongoId({message:"Role phải là mongoId"})
    @IsNotEmpty({message:"Vai trò không được để trống !"})
    role:mongoose.Schema.Types.ObjectId

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(()=>Company)
    company:Company
   
}
export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'chipchip7a2@gmail.com', description: 'haha' })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
        description: '密码',
    })
    readonly password: string;

}

