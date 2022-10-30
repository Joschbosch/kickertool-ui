import { DTO } from './DTO';

export class ListResponseDTO<T> extends DTO {
    dtoValueList: T[];
}
