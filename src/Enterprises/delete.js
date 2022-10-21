import handler from "../../lib/handler";

export const _delete = handler(async ({ Enterprise }, event) => {
  try {
    return Enterprise.destroy({ where: { NIT: event.pathParameters?.id } });
  } catch (err) {
    throw err;
  }
});
