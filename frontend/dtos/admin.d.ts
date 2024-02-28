import { AnchorDTO } from './anchor';
export declare const AnchorRoles: readonly ["/voice/update", "/voice/check", "/voice/tags", "/emoticon/update", "/emoticon/check", "/emoticon/tags"];
export declare type AnchorRoleMap = {
    [key in (typeof AnchorRoles)[number]]: boolean;
};
export declare class AdminAnchorWithRoleDTO extends AnchorDTO {
    role: AnchorRoleMap;
}
export declare class UpdateFileRequestDTO {
    file: string;
    type: 'voice' | 'emoticon' | 'image';
    anchorId: number;
    title: string;
}
