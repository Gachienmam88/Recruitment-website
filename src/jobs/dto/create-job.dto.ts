import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

 
class Company{
    @IsNotEmpty({message:""})
    _id:mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    logo:string
}

export class CreateJobDto {

    @IsNotEmpty({message:"Tên không được để trống !"})
    name:string;
    // @IsString({message:"Nhập vào một chuỗi "})
    @IsArray({ message: 'Skills phải là một mảng!' })
  @ArrayNotEmpty({ message: 'Skills không được để trống!' }) // Đảm bảo mảng không rỗng
  @ArrayMinSize(1, { message: 'Skills phải có ít nhất 1 phần tử!' }) // Đảm bảo có ít nhất 1 phần tử
  @IsString({ each: true, message: 'Mỗi phần tử trong skills phải là chuỗi!' }) // Đảm bảo mỗi phần tử là chuỗi
  skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(()=>Company)
    company:Company

    @IsNotEmpty({message:"Địa chỉ không được để trống !"})
    location:string;

    @IsNotEmpty({message:"Lương không được để trống !"})
    salary:number;

    @IsNotEmpty({message:"Số lượng không được để trống !"})
    quantity:number;

    @IsNotEmpty({message:"Vị trí ứng tuyển không được để trống !"})
    level:string;

    @IsNotEmpty({message:"Vị trí ứng tuyển không được để trống !"})
    description:string;
    
    @IsDateString({message:"Vui lòng nhập ngày hợp lệ !"})
    @IsNotEmpty({message:"Vui lòng nhập ngày bắt đầu"})
    startDate:Date
     

    //@IsDate() chỉ hoạt động nếu dữ liệu được truyền vào là đối tượng Date thực sự. Nếu bạn truyền vào định dạng chuỗi ISO 8601 (thường gặp trong API), hãy dùng @IsDateString() thay vì @IsDate().
    @IsDateString({message:"Vui lòng nhập ngày hợp lệ !"})
    @IsNotEmpty({message:"Vui lòng nhập ngày kết thúc"})
    endDate:Date

    @IsNotEmpty({message:"Vui lòng chọn trạng thái !"})
    @IsBoolean({message:"Vui lòng chọn đúng kiểu dữ liệu !"})
    isActive:boolean
}
