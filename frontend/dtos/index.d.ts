export declare class HTTPResponseData<T = any> {
    code: number;
    data: T;
    message: string;
}
export declare class PageRequestDTO {
    page: number;
    pageSize: number;
}
export declare class PageDTO<T> {
    total: number;
    data: T[];
}
