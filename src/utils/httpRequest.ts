
export interface HttpRequest<T = any> {
    body?: T;
    headers?: { [key: string]: string };
    cookies?: { [key: string]: string };
    queryParams?: { [key: string]: string };
    params?: { [key: string]: string };
    ip: string;
    method: string;
    url: string;
    path: string;
}