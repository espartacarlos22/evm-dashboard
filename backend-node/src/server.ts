import app from "./app";

import { env } from "./config/env";

app.listen(
  env.port,
  () => {
    console.log(
      `🚀 Node API ejecutándose en http://localhost:${env.port}`
    );

    console.log(
      `🐍 FastAPI: ${env.pythonApiUrl}`
    );
  }
);