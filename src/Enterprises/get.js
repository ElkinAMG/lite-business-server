import handler from "../../lib/handler";

export const _get = handler(async ({ Enterprise }, event) => {
  try {
    return Enterprise.findOne({ where: { NIT: event.pathParameters?.id } });
  } catch (err) {
    throw err;
  }
});
