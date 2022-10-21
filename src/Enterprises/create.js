import handler from "../../lib/handler";

export const _create = handler(async ({ Enterprise }, event) => {
  try {
    const { nit, name, address, phone } = JSON.parse(event.body);
    return Enterprise.create({
      NIT: nit,
      name,
      address,
      phone,
    });
  } catch (err) {
    throw err;
  }
});
