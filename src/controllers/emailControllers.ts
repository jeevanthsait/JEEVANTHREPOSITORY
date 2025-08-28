import { Request, Response } from "express";
import { sendMail } from "../services/mailService";

export const sendMailController = async (req: Request, res: Response) => {
  try {
    const { to, subject, text, attachments } = req.body;
    console.log("Request body:", req.body);

    const result = await sendMail(to, subject, text, attachments);

    if (result.success) {
      res.status(200).json({ message: "Mail sent successfully", id: result.messageId });
    } else {
      res.status(500).json({ message: "Failed to send mail", error: result.error });
    }
  } catch (err: unknown) {
    // Narrow unknown type safely
    if (err instanceof Error) {
      res.status(500).json({ message: "Server error", error: err.message });
    } else {
      res.status(500).json({ message: "Server error", error: "Unknown error" });
    }
  }
};
