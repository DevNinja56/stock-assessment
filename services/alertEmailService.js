const { environmentConfig } = require("../envConfig");
const emailjs = require("@emailjs/browser");

const TEMPLATE_SERVICE_ID = environmentConfig.EMAILJS_TEMPLATE_MESSAGE_ID;
const TEMPLATE_MESSAGE_ID = environmentConfig.EMAILJS_TEMPLATE_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = environmentConfig.EMAILJS_PUBLIC_KEY;

emailjs.init(EMAILJS_PUBLIC_KEY);

const sendAlertEmail = async (email, message) => {
  try {
    const templateParams = {
      email,
      message,
    };

    const sendRes = await emailjs.send(
      TEMPLATE_SERVICE_ID,
      TEMPLATE_MESSAGE_ID,
      templateParams
    );

    console.log("email sending response", sendRes);
    return sendRes;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendAlertEmail };
