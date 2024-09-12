import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { Request } from 'express';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService:ConfigService,
    private readonly rolesService:RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      passReqToCallback:true
    });
  }

  async validate( req:Request, payload: IUser) {
    const {_id,name,email,role}=payload;

    //Giai ma token la ngang voi việc là bạn gán biến req.body={id,name,email.,role}


    //Them permissions
    const userRole=payload.role as unknown as {_id:string,name:string}
        const temp = await this.rolesService.findOne(userRole._id)
        const objUser={
          ...payload
          ,permissions:temp?.permissions??[]
        }
        console.log(objUser)
        return objUser;
  }
}