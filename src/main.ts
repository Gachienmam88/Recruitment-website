import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import * as express from 'express'

import cookieParser from 'cookie-parser';
import { join } from 'path';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Config cors
  app.enableCors({origin:true,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue:false,
    optionsSuccessStatus:204,
    credentials:true
  })

  //Congig service to use the enviroment variable 
  const configService = app.get(ConfigService);

  //Config pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
    disableErrorMessages:false
  }))

   //Dung reflector de ... tao bien metadata
   const reflector=app.get(Reflector)
   app.useGlobalGuards(new JwtAuthGuard(reflector))
   app.useGlobalInterceptors(new TransformInterceptor(reflector))
   

  //set cookie de dung config : 
  app.use(cookieParser())

  //cau hinh tep tinh de client co the truy cap duoc 
  app.use('/images', express.static(join(__dirname, '..', 'public/images')));


  //Config helmet
  app.use(helmet())

  //configSwagger
  const config = new DocumentBuilder()
    .setTitle('NestJS series API document')
    .setDescription('All module API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document,{
    swaggerOptions:{
      persistAuthorization:true
    }
  });

  //Start server
  const port = await configService.get('PORT');
   app.listen(port);
}
bootstrap();
