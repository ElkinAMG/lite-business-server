import handler from "../../lib/handler";

export const _getAll = handler(async ({ Enterprise }, event) => {
  try {
    const { page } = event.queryStringParameters;

    if (!page) throw "There must be a page for give data";

    return Enterprise.findAndCountAll({
      limit: 30,
      offset: Number(page) * 30,
    }).then(({ rows, count }) => ({
      items: rows,
      pages: Math.round(count / 30),
    }));
  } catch (err) {
    throw err;
  }
});
