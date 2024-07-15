const { environmentConfig } = require("../envConfig");
const axios = require("axios");

const API_KEY = environmentConfig.WALLSTREET_ODS_API_KEY;
const BASE_URL = environmentConfig.WALLSTREET_ODS_API_URL;

const fetchIndicesOverview = async ({
  indicesSymbols = ["AAPL", "TSLA"],
  fieldsToFetch = ["symbol", "price", "name"],
}) => {
  try {
    const indicesSymbolConcatString = `symbols=${indicesSymbols.toString()}`;
    const snap = await axios.get(
      `${BASE_URL}/api/livestockprices?&apikey=${API_KEY}&fields=${fieldsToFetch}&format=json&${indicesSymbolConcatString}`
    );
    return snap.data.response;
  } catch (error) {
    console.error("Error fetching indices overview:", error);
    return [];
  }
};

const fetchStockDetailsWithinRange = async ({
  from = "2022-01-04",
  to = "2022-01-10",
  symbol = "AAPL",
  fieldsToFetch = ["symbol", "date", "close"],
}) => {
  try {
    const snap = await axios.get(
      `${BASE_URL}/api/historicstockprices?&symbol=${symbol}&from=${from}&to=${to}&fields=${fieldsToFetch.toString()}&apikey=${API_KEY}&format=json`
    );
    return snap.data.response;
  } catch (error) {
    console.error("Error fetching indices overview:", error);
    return [];
  }
};

module.exports = { fetchIndicesOverview, fetchStockDetailsWithinRange };
