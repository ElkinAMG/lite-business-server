import handler from "../../lib/handler";

export const _get = handler(async ({ Inventory }, event) => {
  try {
    return Inventory.findOne({ where: { SKU: event.pathParameters?.sku } });
  } catch (err) {
    throw err;
  }
});
