import handler from "../../lib/handler";
import * as Eta from "eta";

import createPDF from "../../lib/Utils/generatePDF";

import { SES } from "aws-sdk";
import MIME from "mimemessage";

const ses = new SES();

export const _sendEmail = handler(async ({ Inventory, Enterprise }, event) => {
  try {
    const email = JSON.parse(event.body)?.email;

    if (!email) throw "There must be an email to send for";

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

    const inventoryPDF = await createPDF(html);

    const mailContent = MIME.factory({
      contentType: "application/pdf",
      body: [],
    });

    mailContent.header("From", "Lite Businesses <lite@pakud.com>");
    mailContent.header("To", email);
    mailContent.header("Subject", "Inventario - PDF por Correo");

    var attachmentEntity = MIME.factory({
      contentType: "application/pdf",
      contentTransferEncoding: "base64",
      body: inventoryPDF.toString("base64").replace(/([^**\0**]{76})/g, "$1\n"),
    });

    attachmentEntity.header(
      "Content-Disposition",
      'attachment ;filename="inventory.pdf"'
    );

    mailContent.body.push(attachmentEntity);

    await ses
      .sendRawEmail({
        RawMessage: { Data: mailContent.toString() },
      })
      .promise();

    return { sent: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
});
