import { IsArray, IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SendPayment {
  @IsEmail()
  providerEmail: string

  @IsString()
  providerName: string

  @IsString()
  paymentId: string
}

export class SendPaymentInput {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SendPayment)
  items: SendPayment[]
}