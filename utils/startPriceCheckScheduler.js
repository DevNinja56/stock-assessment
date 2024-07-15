const {
  startAlertByPriceCheck,
} = require("../services/startAlertByPriceCheck");

const cron = require("node-cron");

function startPriceCheckScheduler() {
  console.log("Will create scheduler");
  cron.schedule(
    "0 * * * *",
    () => {
      startAlertByPriceCheck();
    },
    {
      scheduled: true,
      timezone: "Europe/London",
    }
  );
}

module.exports = { startPriceCheckScheduler };
