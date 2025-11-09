import * as path from "path";
import * as dotenv from "dotenv";
import * as readline from "readline/promises";
import nodemailer from "nodemailer";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main() {
  console.log("===  Test Gmail + Nodemailer ===\n");

  const { SMTP_USER, SMTP_PASS, FROM_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error(" Faltan variables de entorno.");
    console.error("   Asegurate de tener SMTP_USER y SMTP_PASS en tu .env");
    console.error("   SMTP_USER = tuemail@gmail.com");
    console.error("   SMTP_PASS = APP PASSWORD de 16 caracteres (no tu clave normal)\n");
    process.exit(1);
  }

  const to = await rl.question(" Ingresá tu correo de destino: ");
  rl.close();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: FROM_EMAIL ?? SMTP_USER,
    to,
    subject: "Prueba Gmail + Nodemailer ✅",
    html: `<p>Hola! Este es un test enviado desde <b>src/tests/test-mail.ts</b></p>`,
    text: "Test Nodemailer",
  });

  console.log("\n✅ Enviado. Message-ID:", info.messageId);
  console.log("✉️ Revisá tu bandeja o spam:", to);
}

main().catch((err) => {
  console.error("\n Error al enviar el correo:");
  console.error(err);
  console.error("\nTips:");
  console.error("- Verificá que el .env se esté cargando (ruta y nombres).");
  console.error("- Usá App Password de Gmail (no tu clave normal).");
});
