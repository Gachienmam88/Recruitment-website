import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { JobDocument } from 'src/jobs/schemas/job.shema';
import { SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';
import { Cron} from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mails')
@Controller('api/v1/mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
    @InjectModel('Job') private jobModel: SoftDeleteModel<JobDocument>,
    @InjectModel('Subscriber')
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}
  @Cron("0 10 0 * * 0") // 0.10 AM moi chu nhat trong tuan
  @ResponseMessage('Test email')
  @Public()
  @Get()
  async handleTestEmail() {
    const subscribers = await this.subscriberModel.find({});
    for (const subscriber of subscribers) {
      const jobs = await this.jobModel.find({
        skills: { $in: subscriber?.skills },
      });
      const displayJobs = jobs.map((item)=>{
        return {
          name:item.name,
          company:item.company.name,
          address:item.location,
          salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
          skills:item.skills.reduce((acc, currentValue) => acc + ', ' + currentValue)
        }
      })
      await this.mailerService.sendMail({
        to: 'chipchip9a5@gmail.com',
        from: 'Support Team <support@example.com>',
        subject: 'Welcome to Nice app!Confirm your email !',
        //Gui template thay vi html
        template: 'test', // html body content,
        context: {
          sender: 'Công ty giải pháp công nghệ phần mềm  <abc@company.com>',
          recipient: 'Nguyễn Trung Mạnh <vanA@gmail.com>',
          jobs: displayJobs,
          websiteUrl: 'localhost:3000',
        },
      });
    }
  }
}
