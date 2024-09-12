import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

class UserReference {
  _id: string;
  email: string;
}

@Schema({ timestamps: true })
export class Company {
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  logo:string

  // Sử dụng class UserReference cho các thuộc tính createdBy, updatedBy, deletedBy
  @Prop({ type: UserReference })
  createdBy: UserReference;

  @Prop({ type: UserReference })
  updatedBy: UserReference;

  @Prop({ type: UserReference })
  deletedBy: UserReference;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
  
  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);