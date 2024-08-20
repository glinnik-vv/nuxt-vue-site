// utils/api.ts
import { useRuntimeConfig, useCookie } from '#imports';

type HttpMethod = 
  | "GET"
  | "HEAD"
  | "PATCH"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "get"
  | "head"
  | "patch"
  | "post"
  | "put"
  | "delete"
  | "connect"
  | "options"
  | "trace";

  export const fetchData = async (
    method: HttpMethod, 
    endpoint: string, 
    params: any = null,
    body: any = null,
    processResponse: (data: any) => void,
    handleError: (error: any) => void 
  ) => {
    const runtimeConfig = useRuntimeConfig();
    const access_token = useCookie("access_token");
    const refresh_token = useCookie("refresh_token");
  
    try {
      const token = await $fetch<AuthToken>(
        runtimeConfig.public.API_URL + "/api/token/refresh/",
        {
          method: "POST",
          body: {
            refresh: refresh_token.value,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      access_token.value = token?.access;
    } catch (error) {
      console.error(error);
      navigateTo("/login");
    }
  
    try {
      const data = await $fetch<PaginatedResponse>(
        `${runtimeConfig.public.API_URL}/api/${endpoint}/`,
        {
          method: method,
          params: params,
          body: body,
          headers: {
            Authorization: `Bearer ${access_token.value}`,
          },
          onResponseError: ({ response }) => {
            console.log("onResponseError", response._data);
            handleError(response); // Call the error handling callback
          },
        }
      );
      console.log(data);
      processResponse(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      handleError(error); // Call the error handling callback
      throw error;
    }
  };