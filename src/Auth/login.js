import handler from "../../lib/handler";

import login from "./helpers/login";

export const main = handler(async ({ User }, event) => {
  try {
    return login(JSON.parse(event.body), User);
  } catch (err) {
    throw err;
  }
});
