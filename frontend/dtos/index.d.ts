export declare class HTTPResponseData<T = any> {
    code: number;
    data: T;
    message: string;
    static success<T = any>(data: T): HTTPResponseData<T>;
    static error<T = any>(code: number, message: string): HTTPResponseData<T>;
}
export declare class PageRequestDTO {
    page: number;
    pageSize: number;
}
export declare class PageDTO<T> {
    total: number;
    data: T[];
}
