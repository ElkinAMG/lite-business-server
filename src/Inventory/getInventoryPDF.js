import handler from "../../lib/handler";
import * as Eta from "eta";

import createPDF from "../../lib/Utils/generatePDF";

export const _getInventoryPDF = handler(
  async ({ Inventory, Enterprise }, event) => {
    try {
      const enterprise = await Enterprise.findAll({
        where: {
          NIT: event.pathParameters?.id,
        },
        attributes: ["name", "NIT"],
        raw: true,
      });

      const products = await Inventory.findAll({
        where: {
          enterprise_id: event.pathParameters?.id,
        },
        attributes: ["SKU", "name", "description", "stock"],
        raw: true,
      });

      const html = await Eta.renderFile(`inventory`, {
        enterprise: enterprise.name,
        nit: enterprise.NIT,
        products,
        date: new Date().toLocaleDateString(),
      });

      return {
        file: (await createPDF(html)).toString("base64"),
        contentType: "application/pdf",
        isBase64Encoded: true,
      };
    } catch (err) {
      throw err;
    }
  }
);
