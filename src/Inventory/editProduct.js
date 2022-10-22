import handler from "../../lib/handler";

export const _edit = handler(async ({ Inventory }, event) => {
  try {
    const fields = JSON.parse(event.body);

    if (
      ["SKU", "name", "description", "stock"]
        .map((field) => field in fields)
        .includes(false)
    )
      throw "Fields are not correct";

    return Inventory.update(
      {
        ...fields,
      },
      { where: { SKU: event.pathParameters?.sku } }
    );
  } catch (err) {
    throw err;
  }
});
