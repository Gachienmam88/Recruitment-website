import { Type } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
import { IsMongoId, IsNotEmpty } from "class-validator";
import mongoose, { mongo } from 'mongoose';

export class CreateResumeDto {
    @IsNotEmpty({message:"email không được để trống !"})
    email:string

    @IsNotEmpty({message:"userId không được để trống !"})
    userId:mongoose.Schema.Types.ObjectId

    @IsNotEmpty({message:"url không được để trống !"})
    url:string

    @IsNotEmpty({message:"status không được để trống!"})
    status:string

    @IsMongoId({message:"CompanyId phải là mongo Id !"})
    @IsNotEmpty({message:"companyId không được để trống !"})
    companyId:mongoose.Schema.Types.ObjectId


    @IsMongoId({message:"JobId phải là mongo Id !"})
    @IsNotEmpty({message:"JobId không được để trống !"})
    jobId:mongoose.Schema.Types.ObjectId
}   
export class CreateUserCvDto{
    @IsNotEmpty({message:"url không được để trống !"})
    url:string
    
    @IsMongoId({message:"CompanyId phải là mongo Id !"})
    @IsNotEmpty({message:"companyId không được để trống !"})
    companyId:mongoose.Schema.Types.ObjectId

    @IsMongoId({message:"JobId phải là mongo Id !"})
    @IsNotEmpty({message:"JobId không được để trống !"})
    jobId:mongoose.Schema.Types.ObjectId
}