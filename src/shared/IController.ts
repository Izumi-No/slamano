import { HttpResponse } from "@/utils/httpResponse.js";

export interface Controller<R = any, T = any> {
    handle: (request: R) => Promise<HttpResponse<T>>;
}