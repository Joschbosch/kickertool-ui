import { DTO } from './DTO';

export class ListResponseDTO<T> extends DTO {
    dtoStatus: string;
    dtoValueList: T[];

    public hello(): string {
        return 'hello';
    }
}
