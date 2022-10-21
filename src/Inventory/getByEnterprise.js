import handler from "../../lib/handler";

export const _getByEnterprise = handler(async ({ Inventory }, event) => {
  try {
    const { page } = event.queryStringParameters;

    if (!page) throw "There must be a page for give data";

    return Inventory.findAndCountAll({
      limit: 30,
      offset: Number(page) * 30,
      attributes: ["SKU", "name", "stock", "description"],
      where: {
        enterprise_id: event.queryStringParameters?.id,
      },
    }).then(({ rows, count }) => ({
      items: rows,
      pages: Math.round(count / 30),
    }));
  } catch (err) {
    throw err;
  }
});
