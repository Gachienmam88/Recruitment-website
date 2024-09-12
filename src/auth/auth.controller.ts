import { IUser } from './../users/users.interface';
import { Body, Controller, Get, Injectable, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app.service';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { IRegisterUser } from './registerUser.interface';
import { RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { RolesService } from 'src/roles/roles.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller("api/v1/auth")

export class AuthController {
  constructor(
    private authService:AuthService,
    private rolesService:RolesService
  ) {}

 
//   @Public()
//   @UseGuards(LocalAuthGuard)
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard) // Su dung de chan nhieu request tu 1 IP
  @Throttle(1,60) // Ghi de phan config trong app.module 
  @ResponseMessage("User đăng nhập ")
  @Public()
  @ApiBody({ type: UserLoginDto })
  @Post('login')
  handleLogin(@Req() req:any , @Res({passthrough:true}) response:Response){
    return this.authService.login(req.user,response)
  }


  @Public()
  @ResponseMessage("Đăng ký người dùng mới ")
  @Post('register')
  handleRegister(@Body() req:RegisterUserDto){
    return this.authService.register(req)
  }

  @ResponseMessage("Lấy thông tin người dùng ")
  @Get('account')
  async handleGetAccount(@User() user:IUser){
  const temp= await this.rolesService.findOne(user.role._id) as any
  user.permissions=temp.permissions
  return {user}
}
  

   @Public()
   @ResponseMessage("Lấy thông tin người dùng qua refresh_token")
   @Get("refresh")
   handleRefresh(@User() user:IUser,@Req() req:Request,@Res({passthrough:true}) res:Response){
      const refreshToken=req.cookies['refresh_token']
      return this.authService.processNewToken(refreshToken,res);
   }

   //logout
   //Nguoi dùng phải đăng nhập thì mới đăng xuất được nên endpoint này yêu cầu jWt 
   //Set refresh_token o db = null 
   //xoa cookie refresh_token
   //Tra ve res cho client
   
   @ResponseMessage("Người dùng đăng xuất")
   @Post("logout")
   //Con phan access_token thi' o client ng ta se tu lam'
   handleLogout( @User() user:IUser , @Res({passthrough:true}) res:Response){
      return this.authService.logout(user,res)
   }
}


