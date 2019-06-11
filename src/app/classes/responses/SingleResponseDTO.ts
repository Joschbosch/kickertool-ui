import { DTO } from './DTO';

export class SingleResponseDTO<T> extends DTO {
    dtoValue: T;
}
