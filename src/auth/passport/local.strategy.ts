import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException("Username/password không hợp lệ !");
      }
      return user;
       //Khi mà return user kiểu này thì nếu xác thực thành công sẽ gán @Request.user ( @Request.user đã tồn tại sẵn và có giá trị mặc định là undefined , nên ta có thể đặt biến là gì cũng được) , nếu xác thực thất bại sẽ bắn ra lỗi ngay 
    } catch (error) {
      // Tùy chỉnh lỗi trong catch
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException("Thông tin đăng nhập không hợp lệ.");
      } else {
        throw new InternalServerErrorException("Đã xảy ra lỗi hệ thống.");
      }
    }
  }
}