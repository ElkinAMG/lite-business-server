import handler from "../../lib/handler";
import { SES } from "aws-sdk";

const ses = new SES();

export const _sendEmail = handler(async ({ Inventory }, event) => {
  try {
    const { email } = JSON.parse(event.body);

    if (!email) throw "There must be an email to send for";

    const inventory = await Inventory.findAll({
      where: {
        enterprise_id: event.pathParameters?.id,
      },
      raw: true,
    });

    await ses
      .sendEmail({
        Message: {
          Subject: { Charset: "UTF-8", Data: "Inventario - PDF por Correo" },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: JSON.stringify(inventory),
            },
            Text: {
              Charset: "UTF-8",
              Data: JSON.stringify(inventory),
            },
          },
        },
        Source: "Lite <notificaciones@lite.com>",
        Destination: {
          ToAddresses: [email],
        },
      })
      .promise();

    return { email: "send" };
  } catch (err) {
    throw err;
  }
});
