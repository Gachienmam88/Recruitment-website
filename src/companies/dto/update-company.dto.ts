import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateCompanyDto {
    
    @IsNotEmpty({message:"Please fill your name !"})
    name:string

    @IsNotEmpty({message:"Please fill your address !"})
    address:string;

    @IsNotEmpty({message:"Please fill your description !"})
    description:string
}
