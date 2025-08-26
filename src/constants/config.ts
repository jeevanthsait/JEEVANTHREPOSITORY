import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  // Auth
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  TOKEN_EXPIRY: "1h",

  // Database
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/admin",

  // Mailer
  MAIL: {
    HOST: process.env.MAIL_HOST || "smtp.gmail.com",
    PORT: Number(process.env.MAIL_PORT) || 587,
    USER: process.env.MAIL_USER || "", // your Gmail
    PASS: process.env.MAIL_PASS || "", // app password
  },
};

