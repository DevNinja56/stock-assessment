const { getColRef, getDocById } = require("../firebaseConfig");
const { getDocs, query, where, updateDoc } = require("firebase/firestore");
const { fetchIndicesOverview } = require("./stockService");
const { sendServerSideMail } = require("../utils/sendServersideMail");

const COLLECTION_NAME = "alerts";

const makeAlertStatusInactive = async (id) => {
  const alertDoc = getDocById(COLLECTION_NAME, id);
  return await updateDoc(alertDoc, { active: false });
};

const startAlertByPriceCheck = async () => {
  const alertsQuery = query(
    getColRef(COLLECTION_NAME),
    where("active", "==", true)
  );
  const querySnapshot = await getDocs(alertsQuery);

  const activeAlerts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
    direction: doc.data().direction,
    threshold: doc.data().threshold,
    symbol: doc.data().symbol,
    active: doc.data().active,
  }));

  if (activeAlerts?.length < 1) {
    return console.log(`There are no active alerts to check for !!`);
  }

  const indicesSymbols = [];

  activeAlerts.forEach(({ symbol }) => {
    if (!indicesSymbols.includes(symbol)) {
      indicesSymbols.push(symbol);
    }
  });

  const requiredIndicesOverview = await fetchIndicesOverview({
    indicesSymbols,
  });

  const requiredIndicesOverviewObj = {};

  requiredIndicesOverview.forEach((item) => {
    requiredIndicesOverviewObj[item.symbol] = item.price;
  });

  for (const activeAlert of activeAlerts) {
    if (
      activeAlert.direction === "above" &&
      requiredIndicesOverviewObj[activeAlert.symbol] > activeAlert.threshold
    ) {
      await makeAlertStatusInactive(activeAlert.id);
      await sendServerSideMail(
        activeAlert.email,
        `Price has gone above for your index threshold ${
          activeAlert.symbol
        }, current price for index is $${
          requiredIndicesOverviewObj[activeAlert.symbol]
        } , This email was intended for ${activeAlert.email}`
      );
    } else if (
      activeAlert.direction === "below" &&
      requiredIndicesOverviewObj[activeAlert.symbol] < activeAlert.threshold
    ) {
      await makeAlertStatusInactive(activeAlert.id);
      await sendServerSideMail(
        activeAlert.email,
        `Price has gone below for your index threshold ${
          activeAlert.symbol
        }, current price for index is $${
          requiredIndicesOverviewObj[activeAlert.symbol]
        } , This email was intended for ${activeAlert.email}`
      );
    }
  }
};

module.exports = { startAlertByPriceCheck };
