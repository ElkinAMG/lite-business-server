import handler from "../../lib/handler";

import signUp from "./helpers/register";

export const main = handler(async ({ User }, event) => {
  try {
    return signUp(JSON.parse(event.body), User);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
