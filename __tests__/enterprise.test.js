import { _create } from "../src/Enterprise";

test("should create a new enterprise on db", async () => {
  const enterpriseInfo = {
    event: {
      body: JSON.stringify({
        nit: "1111111111",
        name: "Jhon Doe",
        address: "Cll 93 # 7 78",
        phone: "3002001001",
      }),
    },
  };
  const enterprise = await _create({
    event: {
      body: JSON.stringify(enterpriseInfo),
    },
  });
  expect(JSON.parse(enterprise.body)).toMatchObject(enterpriseInfo);
});
