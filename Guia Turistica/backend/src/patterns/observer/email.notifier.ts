import * as nodemailer from "nodemailer";
import { Subscriber } from "./notification.subscriber";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailNotifier implements Subscriber {
  async update(event: string, data?: any) {
    if (event !== "NEW_SUBSCRIPTION" || !data) return;
    const { userEmail, userName, activityName } = data;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL ?? process.env.SMTP_USER,
      to: userEmail, // viene del front
      subject: `Suscripción confirmada: ${activityName}`,
      html: `<p>Hola ${userName}!</p><p>Te suscribiste a <b>${activityName}</b>. Gracias por usar la plataforma.</p>`,
    });
  }
}