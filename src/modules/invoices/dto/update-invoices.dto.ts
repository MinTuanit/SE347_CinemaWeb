import { PartialType } from '@nestjs/swagger';
import { CreateInvoicesDto } from './create-invoices.dto';

export class UpdateInvoicesDto extends PartialType(CreateInvoicesDto) {}
