const { toast } = require("react-toastify");

const { getColRef } = require("../firebaseConfig.js");
const { addDoc, getDocs, query, where } = require("firebase/firestore");

const COLLECTION_NAME = "alerts";

const createAlert = async ({ email, direction, threshold, symbol }) => {
  try {
    const alertsQuery = query(
      getColRef(COLLECTION_NAME),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(alertsQuery);

    const prevAlerts = querySnapshot.docs.map((doc) => ({
      email: doc.data().email,
      direction: doc.data().direction,
      threshold: doc.data().threshold,
      symbol: doc.data().symbol,
      active: doc.data().active,
    }));

    const isAlreadySet = prevAlerts.some(
      (alert) => alert.symbol === symbol && alert.active
    );

    if (isAlreadySet) {
      throw new Error(`Alert for this symbol ${symbol} already exists`);
    }

    await addDoc(getColRef(COLLECTION_NAME), {
      email,
      direction,
      threshold,
      symbol,
      active: true,
    });

    console.log(
      `Alert added successfully & you will be notified via your email`
    );
  } catch (error) {
    console.log("Error adding alert", error);
    throw new Error(error?.message);
  }
};

export { createAlert };
