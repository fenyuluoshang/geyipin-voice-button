import { VoiceDTO } from './voice';
export declare class AnchorDTO {
    id: number;
    anchorName?: string;
    anchorTitle?: string;
    pathName?: string;
    biliId?: number;
    biliveId?: number;
    lastVideoBV?: string;
    primaryColor?: string;
    secondColor?: string;
    primaryColorDark?: string;
    secondColorDark?: string;
    btnColor?: string;
    createAt?: Date;
    updateAt?: Date;
    voices?: VoiceDTO[];
    biliveCaptain?: BliveCaptainDTO;
}
export declare class BliveCaptainDTO {
    id: number;
    anchor?: AnchorDTO;
    anchorId: number;
    sums: number;
    createAt?: Date;
    updateAt?: Date;
}
export declare class AnchorCreateRequest {
    anchorName: string;
    anchorTitle: string;
    pathName: string;
    biliId?: number;
    biliveId?: number;
    lastVideoBV?: string;
    primaryColor?: string;
    secondColor?: string;
    primaryColorDark?: string;
    secondColorDark?: string;
    btnColor?: string;
}
export declare class AnchorEditRequest {
    anchorName?: string;
    anchorTitle?: string;
    pathName?: string;
    biliId?: number;
    biliveId?: number;
    lastVideoBV?: string;
    primaryColor?: string;
    secondColor?: string;
    primaryColorDark?: string;
    secondColorDark?: string;
    btnColor?: string;
}
