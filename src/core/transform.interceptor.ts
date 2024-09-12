import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RESPONSE_MESSAGE } from 'src/decorator/customize';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message:
          this.reflector.get<string>(
            RESPONSE_MESSAGE,
            context.getHandler()
          ) || '',
        // message: data.message,
        data: data,
      })),
      // catchError((err) => {
      //   // Xử lý trường hợp exception được ném ra
      //   const statusCode =
      //     err instanceof HttpException
      //       ? err.getStatus()
      //       : HttpStatus.INTERNAL_SERVER_ERROR;

      //   // Lấy thông điệp lỗi từ exception
      //   const errorMessage =
      //     err instanceof HttpException
      //       ? err.message // Lấy message từ exception
      //       : 'Internal server error';

      //   return throwError(() => (new HttpException(
      //       {
      //         statusCode: statusCode,           // Trả về status code
      //         message: errorMessage,            // Thông điệp lỗi
      //         error: err.name || 'Error',       // Tên lỗi hoặc loại lỗi
      //       },
      //       statusCode,  // Trả về status code tương ứng
      //     )));
      // }),
    );
  }
}

