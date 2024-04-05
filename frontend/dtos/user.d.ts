export declare class UserLoginRequest {
    userName: string;
    password: string;
    captchaVerifyParam: string;
}
export declare class RoleDTO {
    roleStr: string;
    id: number;
    user?: UserModelDTO;
    group?: UserGroupDTO;
}
export declare class UserGroupDTO {
    title?: string;
    id: number;
    users?: UserModelDTO[];
    roles?: RoleDTO[];
}
export declare class UserModelDTO {
    id: number;
    nickName?: string;
    name: string;
    phone?: string;
    mail?: string;
    roleMerge?: string[];
    roles?: RoleDTO[];
    group?: UserGroupDTO;
}
export declare class UserWithJWTDTO extends UserModelDTO {
    jwt: string;
}
export declare class SendSmsRequestDTO {
    phone: string;
}
export declare class SmsLoginRequestDTO {
    phone: string;
    code: string;
}
export declare class CreateUserRequestDTO {
    username: string;
    nickName: string;
    password: string;
    groupId?: number;
    phone?: string;
    email?: string;
}
export declare class EditUserRequestDTO {
    username: string;
    nickName: string;
    groupId?: number;
    phone?: string;
    email?: string;
}
export declare class EditRoleParamDTO {
    id: number;
    type: 'group' | 'user';
}
export declare class EditRoleRequestDTO {
    roles: string[];
}
export declare class ChangePasswordRequestDTO {
    newPassword: string;
}
export declare class UserEditRequestDTO {
    username?: string;
    nickName?: string;
    phone?: string;
    email?: string;
}
export declare class createGroupRequestDTO {
    title: string;
}
