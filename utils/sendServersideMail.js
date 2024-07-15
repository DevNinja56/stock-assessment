const { environmentConfig } = require("../envConfig");
const axios = require("axios");

const TEMPLATE_SERVICE_ID = environmentConfig.EMAILJS_TEMPLATE_MESSAGE_ID;
const TEMPLATE_MESSAGE_ID = environmentConfig.EMAILJS_TEMPLATE_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = environmentConfig.EMAILJS_PUBLIC_KEY;

const sendServerSideMail = async (email, message) => {
  try {
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: TEMPLATE_SERVICE_ID,
        template_id: TEMPLATE_MESSAGE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          email: email,
          message: message,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error?.message);
  }
};

module.exports = { sendServerSideMail };
