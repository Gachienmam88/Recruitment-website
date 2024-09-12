import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
    
    @IsNotEmpty({message:"Please fill your name !"})
    name:string

    @IsNotEmpty({message:"Please fill your address !"})
    address:string;

    @IsNotEmpty({
        message:"Vui lòng chọn logo công ty"
    })
    @IsString({
        message:"Vui lòng chọn ảnh hợp lệ"
    })
    logo:string

    @IsNotEmpty({message:"Please fill your description !"})
    description:string
}
