import { Body, Controller, InternalServerErrorException, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SendPaymentInput } from '../validation/provider';
import {getHtmlRendered} from './helper';

@Controller('provider')
export class ProviderController {
  constructor(
    private readonly configService: ConfigService,
    @InjectSendGrid() private readonly sendgrid: SendGridService
  ) {}

  @Post('send-payment')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async send(
    @Body() body: SendPaymentInput
  ): Promise<void> {
    const {items} = body
    console.log('body: ', body);
    try {
      const {
        SRBARRIGA_URL,
        DEFAULT_FROM_EMAIL,
        DEFAULT_CC_EMAIL
      } = process.env

      const emailsToSent: Partial<MailDataRequired>[] = []
  
      for (let i = 0; i < items.length; i++) {
        const {
          providerEmail,
          providerName,
          paymentId,
        } = items[i]
  
        const paymentLink = `${SRBARRIGA_URL}/public-pages/payment/${paymentId}`
        const sendFilesLink = `${SRBARRIGA_URL}/public-pages/payment/${paymentId}?sendFiles=true`
        const html = await getHtmlRendered(
          'providerPayment',
          {
            providerName,
            paymentLink,
            sendFilesLink
          }
        ) as string

        emailsToSent.push({
          to: providerEmail,
          from: DEFAULT_FROM_EMAIL,
          subject: `bem.care - Folha de recebimento`,
          html,
          cc: DEFAULT_CC_EMAIL
        })
      }

      await new Promise((resolve, reject) => {
        this.sendgrid.send(
          emailsToSent,
          true,
          (err, result) => {
            console.log('err, result: ', err, result);
            if (err) return reject(err)
            return resolve(result)
          }
        )
      })
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }
}
