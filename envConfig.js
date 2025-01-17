require("dotenv").config();

const environmentConfig = {
  EMAILJS_TEMPLATE_SERVICE_ID:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_SERVICE_ID,
  EMAILJS_TEMPLATE_MESSAGE_ID:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_MESSAGE_ID,
  EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,

  WALLSTREET_ODS_API_KEY: process.env.NEXT_PUBLIC_WALLSTREET_ODS_API_KEY,
  WALLSTREET_ODS_API_URL: process.env.NEXT_PUBLIC_WALLSTREET_ODS_API_URL,

  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

module.exports = { environmentConfig };
