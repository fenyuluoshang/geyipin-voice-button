import { AnchorDTO } from './anchor';

export declare const AnchorRoles: readonly ["/voice/update", "/voice/check", "/voice/tags", "/emotion/update", "/emotion/check", "/emotion/tags"];
export declare type AnchorRoleMap = {
    [key in (typeof AnchorRoles)[number]]: boolean;
};
declare class AdminAnchorWithRoleDTO extends AnchorDTO {
    role: AnchorRoleMap;
}
export default AdminAnchorWithRoleDTO;
