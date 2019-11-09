import { ValidationDTO } from './ValidationDTO';

export abstract class DTO {
    dtoStatus: string;
    validation: ValidationDTO;
}
