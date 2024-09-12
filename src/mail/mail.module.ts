import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/jobs/schemas/job.shema';
import { Subscriber, SubscriberSchema } from 'src/subscribers/schemas/subscriber.schema';
@Module({
  controllers: [MailController],
  providers: [MailService],
  imports:[
    MailerModule.forRootAsync({
      useFactory:async (configService:ConfigService)=>({
        transport:{
          host:configService.get<string>("EMAIL_HOST"),
          secure:false,
          auth:{
            user:configService.get<string>("EMAIL_AUTH_USER"),
            pass:configService.get<string>("EMAIL_AUTH_PASS")
          }
        },
        preview:true,
        template:{       
            dir:join(__dirname,'templates'),
            adapter:new HandlebarsAdapter(),
            options:{
              strict:true
            },
          }
      }),
      inject:[ConfigService ]
    }),
    MongooseModule.forFeature([
      {name:Job.name,schema:JobSchema},
      {name:Subscriber.name,schema:SubscriberSchema}
    ])
  ]
})
export class MailModule {}
