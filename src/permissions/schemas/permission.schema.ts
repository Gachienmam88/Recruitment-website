import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';


export type PermissionDocument = HydratedDocument<Permission>;

///Moi permission la 1 api o backend
@Schema({timestamps:true})
export class Permission {
  @Prop()
  @IsNotEmpty({message:"Tên  không được để trống !"})
  name:string

  @Prop()
  @IsNotEmpty({message:"Path không được để trống ! "})
  apiPath:string

  @Prop()
  @IsNotEmpty({message:"Phương thức không được để trống !"})
  method:string

  @Prop()
  @IsNotEmpty({message:"Module không được để trống"})
  module:string
  
  @Prop()
  @IsNotEmpty({message:"Không được để trống !"})
  deletedAt:Date
  
  @Prop()
  @IsNotEmpty({message:"Kô được để trống !"})
  isDeleted:boolean

  @Prop({type:Object})
  createdBy:{
    _id:string,
    email:string
  }
  @Prop({type:Object})
  updatedBy:{
    _id:string,
    email:string
  }
  @Prop({type:Object})
  deletedBy:{
    _id:string,
    email:string
  }

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);