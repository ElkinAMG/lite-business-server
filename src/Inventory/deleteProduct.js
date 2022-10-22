import handler from "../../lib/handler";

export const _delete = handler(async ({ Inventory }, event) => {
  try {
    return Inventory.destroy({ where: { SKU: event.pathParameters?.sku } });
  } catch (err) {
    throw err;
  }
});
