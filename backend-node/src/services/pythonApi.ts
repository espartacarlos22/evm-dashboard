import axios from "axios";

import { env } from "../config/env";

const pythonApi = axios.create({
  baseURL: env.pythonApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default pythonApi;
