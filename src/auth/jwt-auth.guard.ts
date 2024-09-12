import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSIONS } from 'src/decorator/customize';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      } 
      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        return super.canActivate(context);
      }
  
    handleRequest(err:any, user:any, info:any,context:ExecutionContext) {
      const request:Request = context.switchToHttp().getRequest()
      const isPublicPermissions = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSIONS, [
        context.getHandler(),
        context.getClass(),
      ]);
      // You can throw an exception based on either "info" or "err" arguments
      if (err || !user) {
        throw err || new UnauthorizedException("Token không hợp lệ hoặc không có Beaeer Token ở header !");
      }
      //Check permission tai day : 
      const currentMethod = request.method
      const targetEndPoint = request.route?.path
      const permissions = user?.permissions??[]
      console.log(currentMethod,targetEndPoint)
      const isExist = permissions.find((permission:any)=>permission.method===currentMethod&&permission.apiPath===targetEndPoint)
      if(!isExist && !isPublicPermissions){
        throw new ForbiddenException(`Bạn không có quyền để truy cập endpoint ${targetEndPoint} này`)
      }
      return user;
    }
  }