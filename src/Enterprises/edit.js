import handler from "../../lib/handler";

export const _edit = handler(async ({ Enterprise }, event) => {
  try {
    const fields = JSON.parse(event.body);

    if (
      ["NIT", "name", "address", "phone"]
        .map((field) => field in fields)
        .includes(false)
    )
      throw "Fields are not correct";

    return Enterprise.update(
      {
        ...fields,
      },
      { where: { NIT: event.pathParameters?.id } }
    );
  } catch (err) {
    throw err;
  }
});
