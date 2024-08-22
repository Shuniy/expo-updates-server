import axios, { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import {
  ApiResponse,
  HeaderContentType,
  HttpHeaderField,
  HTTPHeaders,
  NetworkRequestRouter,
} from "./models";

export function getDefaultHeaders(): HTTPHeaders {
  const defaultHeaders: HTTPHeaders = {
    [HttpHeaderField.acceptType]: HeaderContentType.json,
    [HttpHeaderField.contentType]: HeaderContentType.json,
  };
  return defaultHeaders;
}

async function fetchResponse<T>(router: NetworkRequestRouter): Promise<ApiResponse<T>> {
  if (router.graphqlBody) {
    return handleUsingGraphQL(router);
  } else {
    return handleUsingAxios(router);
  }
}

async function handleUsingGraphQL<T>(router: NetworkRequestRouter): Promise<ApiResponse<T>> {
  throw Error;
}

function getCurrentTimeMilliSeconds(): number {
  const currentTimeInMilliseconds: number = new Date().getTime();
  return currentTimeInMilliseconds;
}

async function handleUsingAxios<T>(router: NetworkRequestRouter): Promise<ApiResponse<T>> {
  const startTime: number = getCurrentTimeMilliSeconds();
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: router.baseUrl,
    headers: {
      ...axios.defaults.headers.common,
      ...(router.headers || {}),
    },
  });
  let axiosPromise: Promise<AxiosResponse<T>>;
  switch (router.methodType) {
    case "GET":
      axiosPromise = axiosInstance.get<T>(router.path);
      break;
    case "HEAD":
      axiosPromise = axiosInstance.head<T>(router.path);
      break;
    case "POST":
      axiosPromise = axiosInstance.post<T, AxiosResponse<T>>(router.path, router.body);
      break;
    case "PUT":
      axiosPromise = axiosInstance.put<T, AxiosResponse<T>>(router.path, router.body);
      break;
    case "DELETE":
      axiosPromise = axiosInstance.delete<T, AxiosResponse<T>>(router.path);
      break;
    case "PATCH":
      axiosPromise = axiosInstance.patch<T, AxiosResponse<T>>(router.path, router.body);
      break;
    case "OPTIONS":
      axiosPromise = axiosInstance.options<T>(router.path);
      break;
  }
  return await axiosPromise
    .then((response: AxiosResponse<T>) => {
      const endTime: number = getCurrentTimeMilliSeconds();

      return {
        data: response.data,
        statusCode: response.status,
        successStatus: true,
        statusText: response.statusText,
        error: undefined,
        timeTaken: endTime - startTime,
      };
    })
    .catch((error: AxiosError) => {
      const errorResponse: ApiResponse<T> = handleErrorResponse(error);
      const endTime: number = getCurrentTimeMilliSeconds();
      errorResponse.timeTaken = endTime - startTime;

      return errorResponse;
    });
}

//it handle the error response
function handleErrorResponse<T>(error: AxiosError): ApiResponse<T> {
  if (error && error?.request) {
    return {
      successStatus: false,
      statusCode: error?.response?.status ?? 0,
      error: error.message || "An error occurred",
      statusText: error?.response?.statusText ?? "",
    };
  } else if (error && error.request) {
    return {
      successStatus: false,
      statusCode: 204, // Since, No Response, status code is 204
      error: "No response received from the server",
      statusText: error.cause?.message || "Something Went Wrong",
    };
  } else {
    return {
      successStatus: false,
      statusCode: 204, // Something went wrong
      error: error?.message || "An error occurred",
      statusText: error.message,
    };
  }
}
export default fetchResponse;
