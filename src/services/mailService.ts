import nodemailer from "nodemailer";
import { CONFIG } from "../constants/config";
import path from "path";
import Product from "../models/product"; // capital P for model

const transporter = nodemailer.createTransport({
  host: CONFIG.MAIL.HOST,
  port: CONFIG.MAIL.PORT,
  secure: false,
  auth: {
    user: CONFIG.MAIL.USER,
    pass: CONFIG.MAIL.PASS,
  },
});

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  attachments?: { filename: string; path: string }[]
) => {
  try {
    const formattedAttachments = attachments?.map(file => ({
      filename: file.filename,
      path: path.isAbsolute(file.path)
        ? file.path
        : path.join(process.cwd(), "uploads", file.path),
    }));

    const info = await transporter.sendMail({
      from: `"My App" <${CONFIG.MAIL.USER}>`,
      to,
      subject,
      text,
      attachments: formattedAttachments,
    });

    return { success: true, messageId: info.messageId };
  }
   catch (error) {
    return { success: false, error };
  }
};


