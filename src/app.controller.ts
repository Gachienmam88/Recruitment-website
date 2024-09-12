import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/customize';

@Controller("/")
export class AppController {
 
   

  // @Get("/")
  // getHello(): string {
  //   console.log(">>>>>configservice",this.configService.get<string>("MONGO_URL"))
  //   return this.appService.getHello();
  // }
 
}
