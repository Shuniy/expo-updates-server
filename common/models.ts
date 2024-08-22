export type Error = {
  code: number | string;
  message: string;
  name?: string;
  stack?: string;
  type?: string;
  errorJSON?: string | Object;
};

export type SuccessResponse = Record<string, any> | undefined;
export type BodyParameters = Record<string, any> | undefined;
export type HTTPHeaders = Record<HttpHeaderField | string, HeaderContentType | string> | undefined;
export type QueryItems = Record<string, any> | undefined;
export type GraphqlParameters = string | undefined;

export interface ApiResponse<T> {
  successStatus: boolean;
  statusText: string;
  statusCode: number;
  data?: T;
  error?: string;
  timeTaken?: number;
}

export interface NetworkRequestRouter {
  baseUrl: string;
  path: string;
  methodType: HTTPMethod;
  headers?: HTTPHeaders;
  queryItems?: QueryItems;
  body?: BodyParameters;
  graphqlBody?: GraphqlParameters;
  signalAbort?: AbortSignal;
}

export type HTTPMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export enum NetworkStatus {
  success,
  failure,
  pending,
}

export enum HttpHeaderField {
  authentication = "Authorization",
  contentType = "Content-Type",
  acceptType = "Accept",
  acceptEncoding = "Accept-Encoding",
  contentLength = "Content-Length",
}

export enum HeaderContentType {
  json = "application/json",
  xml = "text/xml; charset=utf-8",
}

export type UpdateMetaDataDB = {
  deployment: "Production" | "Staging" | "Testing";
  downloads?: number;
  enabled: boolean;
  is_rollback: boolean;
  mandatory: boolean;
  name: string;
  release_method: "Upload";
  rollbacks?: number;
  runtime_version: string;
  size: number;
  timestamp: number;
  uploaded_by: string;
  description: string;
};
