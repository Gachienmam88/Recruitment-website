import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const RESPONSE_MESSAGE='response_message'
export const IS_PUBLIC_PERMISSIONS = 'isPublicPermissions'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // Decorator set để bỏ qua việc check jwt của người dùng 

export const SkipCheckPermissions = ()=>SetMetadata(IS_PUBLIC_PERMISSIONS,true) //decorator để bỏ qua việc check permisison của người dùng , chứ vẫn yêu cầu jwt

export const ResponseMessage = (message: string) =>
    SetMetadata(RESPONSE_MESSAGE, message)


export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
//endpoint nao khong muon check quyen thi 