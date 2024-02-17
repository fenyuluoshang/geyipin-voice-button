import { AnchorDTO } from './anchor';
export declare class EmoticonTagDTO {
    id: number;
    title: string;
    anchor?: AnchorDTO;
    emoticons?: EmoticonDTO[];
}
export declare class EmoticonDTO {
    id: number;
    source?: string;
    anchor?: AnchorDTO;
    tags?: EmoticonDTO[];
}
export declare class UploadSTSRequest {
    file: string;
    anchor: number;
}
