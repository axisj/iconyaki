import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError } from "./ApiError";

export const API_URL = "";

const _axios = axios.create({
  baseURL: API_URL,
});

const prepareRequest = async (config: AxiosRequestConfig) => {
  config.headers ??= {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  };
};

export interface ApiRequestConfig extends AxiosRequestConfig {
  tryTime?: number;
  ignoreError?: boolean;
}

type Method = "request" | "get" | "delete" | "head" | "post" | "put" | "patch";
export const apiWrapper = async <P>(
  method: Method,
  route: string,
  body?: any,
  config: ApiRequestConfig = {},
): Promise<AxiosResponse<P>> => {
  await prepareRequest(config);

  // remove undefined | null
  for (const key in body) {
    if (body[key] === undefined) {
      delete body[key];
    }
  }

  let bodyArr: any[] = [];
  let searchParams: string = "";
  switch (method) {
    case "request":
      bodyArr = [config];
      break;
    case "get":
    case "delete":
    case "head":
      if (body?.pageNumber !== undefined) {
        body.pageNumber = Math.max(body.pageNumber - 1, 0);
      }
      searchParams = new URLSearchParams(body).toString();
      bodyArr = [route + `${searchParams ? "?" + searchParams : ""}`, config];
      break;
    case "post":
    case "put":
    case "patch":
      bodyArr = [route, body, config];
      break;
    default:
      break;
  }

  if (!bodyArr.length) {
    throw { code: "ERR" };
  }

  // @ts-ignore
  const { data, ...rest } = await _axios[method](...bodyArr);

  if (!config.ignoreError && data.error && data.error.code) {
    throw new ApiError(data.error.code, data.error.message);
  }

  return { data: data as P, ...rest };
};
export const setApiHeader = (token: string) => {
  _axios.defaults.headers.common["Authorization"] = token;
};
