import axios from "axios";

import { axiosCreateInstanceType } from "@/types/axios";

export const createAxiosInstance = (props: axiosCreateInstanceType) =>
  axios.create({
    baseURL: props.url,
    timeout: props.timeout,
    headers: { "X-Custom-Header": "foobar" },
  });
