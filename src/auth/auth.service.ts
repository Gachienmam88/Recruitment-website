import { RolesService } from './../roles/roles.service';
import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import { IRegisterUser } from './registerUser.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private readonly configService: ConfigService , private roleService:RolesService ) { }
  //user name , passport no nme ve 
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = await this.usersService.checkUserPassword(pass, user.password)
      if (isValid === true) {
        const userRole=user.role as unknown as {_id:string,name:string}
        const temp = await this.roleService.findOne(userRole._id)
        const objUser={
          ...user.toObject()
          ,permissions:temp?.permissions??[]
        }
        return objUser;
      }
    }
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }
  async login(user: IUser, response: Response) {
    const { _id, name, email, role , permissions } = user;

    const payload = {
      sub: "token login",
      iss: "From server",
      _id,
      name,
      email,
      role
    };
    const refreshToken = this.createRefreshToken(payload)
    await this.usersService.updateUserToken(refreshToken, _id)
    //Khi user logout sẽ xóa đi phần refreshToken này đi



    //set refresh_token voi cookie
    const input: string | undefined = this.configService.get<string>("JWT_REFRESH_EXPIRE")
    const milliseconds = input ? ms(input) : undefined;
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: milliseconds /// miliseconds
    })



    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
        permissions
      }
    };
  }
  async register(user: RegisterUserDto) {
    try {
      const newUser = await this.usersService.register(user)
      return {
        _id: newUser?._id,
        createdAt: newUser?.createdAt
      }
    } catch (error) {

    }
  }
  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_TOKEN"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRE")
    })
    return refresh_token
  }

  async processNewToken(refreshToken: string, res: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET")}) //Neu khong hop le hoac het han se tra ve 1 exception 

            //Tim kiem user nao co refreshtoken co trong database khong : 
            const user = await  this.usersService.findUserByToken(refreshToken)      
            if(user) {
          //update access token moi cho nguoi dung 
          const { _id, name, email, role } = user;

          const payload = {
            sub: "token refresh",
            iss: "From server",
            _id,
            name,
            email,
            role
          };
          const refreshToken = this.createRefreshToken(payload)
          await this.usersService.updateUserToken(refreshToken, _id.toString())

          const input: string | undefined = this.configService.get<string>("JWT_REFRESH_EXPIRE")
          const milliseconds = input ? ms(input) : undefined;

          //fetch user role
          const userRole=user.role as unknown as {_id:string,name:string}
          const temp=await this.roleService.findOne(userRole._id)
          //Xoa token cu di 
          res.clearCookie('refresh_token')

          res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: milliseconds /// miliseconds
          })



          return {
            access_token: this.jwtService.sign(payload),
            user: {
              _id,
              name,
              email,
              role,
              permissions:temp?.permissions??[]
            }
          };
        } else {
          throw new BadRequestException("Refresh token đã hết hạn hoặc không hợp lệ , vui lòng đăng nhập lại !")
        }

      
    } catch (error) {
      throw new BadRequestException("Refresh token đã hết hạn hoặc không hợp lệ , vui lòng đăng nhập lại !")
    }
  }
  async logout(user:IUser , res:Response){
    //set user refresh_token  = ''
    
    await this.usersService.updateUserToken('',user._id)

    
    //xoa cookie 
    res.clearCookie("refresh_token")
    
    //Phan hoi nguoi dung : 
    return "very good"

  }
}
