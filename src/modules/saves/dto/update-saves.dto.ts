import { PartialType } from '@nestjs/swagger';
import { CreateSavesDto } from './create-saves.dto';

export class UpdateSavesDto extends PartialType(CreateSavesDto) {}
