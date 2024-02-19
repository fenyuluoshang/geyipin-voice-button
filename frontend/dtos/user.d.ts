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
