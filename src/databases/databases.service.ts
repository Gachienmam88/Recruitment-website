import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { RoleDocument } from 'src/roles/schemas/role.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);
    constructor(@InjectModel('User') private userModel:SoftDeleteModel<UserDocument>,
    @InjectModel('Permission') private permissionModel:SoftDeleteModel<PermissionDocument>,
    @InjectModel('Role') private roleModel:SoftDeleteModel<RoleDocument>,
    private configService:ConfigService,
    private userService:UsersService,
){}
    //service la moi ket noi den db ;
    async onModuleInit() {
        const isInit = this.configService.get<string>("SHOULD_INIT")
        if(Boolean(isInit)){
            const countUser=await this.userModel.count({})
            const countPermission=await this.permissionModel.count({})
            const countRole=await this.roleModel.count({})

            //create permissons
            if(countPermission===0){
                await this.permissionModel.insertMany(INIT_PERMISSIONS)
            }
            //create role
            if(countRole===0){
                const permissions = await this.permissionModel.find({}).select("_id")
                await this.roleModel.insertMany([{
                    name:ADMIN_ROLE,
                    description:"Admin có full quyền hạn",
                    isActive:true,
                    permissions:permissions
                },
                {
                    name:USER_ROLE,
                    description:"Người dùng / ứng viên sử dụng hệ thống",
                    isActive:true,
                    permissions:[] //Khong set quyen chi can add roles
                }
            ]
            )
            }
            if(countUser===0){
                const adminRole=await this.roleModel.findOne({name:ADMIN_ROLE})
                const userRole=await this.roleModel.findOne({name:USER_ROLE})
                await this.userModel.insertMany([
                    {
                        name:"I'm admin",
                        email:"admin@gmail.com",
                        password:this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")??""),
                        age:69,
                        gender:"MALE",
                        address:"Viet Nam",
                        role:adminRole?._id
                    },
                    {
                        name:"I'm Nguyễn Trung Mạnh",
                        email:"chipchip7a2@gmail.com",
                        password:this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")??""),
                        age:96,
                        gender:"MALE",
                        address:"Viet Nam",
                        role:adminRole?._id
                    },
                    {
                        name:"I'm normal user",
                        email:"user@gmail.com",
                        password:this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD")??""),
                        age:96,
                        gender:"MALE",
                        address:"Viet Nam",
                        role:userRole?._id
                    }
                ])
            }
            if(countUser>0 && countRole>0 && countPermission>0){
                this.logger.log(">>> ALREADY INIT SAMPLE DATA !")
            }
        }
    }
}
