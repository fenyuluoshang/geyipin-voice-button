export declare class UserLoginRequest {
    userName: string;
    password: string;
    captchaVerifyParam: string;
}
export declare class UserModelDTO {
    id: number;
    nickName?: string;
    name: string;
    phone?: string;
    mail?: string;
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
