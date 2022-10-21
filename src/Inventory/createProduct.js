import handler from "../../lib/handler";

export const _create = handler(async ({ Inventory }, event) => {
  try {
    const { sku, name, description, enterpriseId, stock } = JSON.parse(
      event.body
    );
    return Inventory.create({
      SKU: sku,
      enterprise_id: enterpriseId,
      name,
      description,
      stock,
    });
  } catch (err) {
    throw err;
  }
});
