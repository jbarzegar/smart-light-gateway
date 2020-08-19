import { initLightConnection } from "./lights";
import { initApi } from "./api";

initLightConnection()
  .then(initApi)
  .catch((e) => {
    console.error(e);
  });
