import React, { useState } from "react";

import withAuth from "@/hoc/withAuth";
import { useAuth } from "@/hooks/useAuth";
import { createAlert } from "@/services/alertService";
import { toast } from "react-toastify";

const AlertForm = ({ onSubmit }) => {
  const [stockSymbols, setStockSymbols] = useState(["AAPL", "TSLA"]);
  const [symbol, setSymbol] = useState(stockSymbols[0]);
  const [price, setPrice] = useState(1);
  const [direction, setDirection] = useState("above");
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    createAlert({
      symbol,
      threshold: parseFloat(price),
      direction,
      email: user.email,
    })
      .then((dt) =>
        toast.success("Alert created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      )
      .catch((e) =>
        toast.error(e.message || `Alert creation failed`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
  };

  return (
    <div className="mt-12 pb-14">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">
        Create Alert
      </h1>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="stockSymbols"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Symbol
          </label>
          <select
            id="stockSymbols"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSymbol(e.target.value)}
            defaultValue={symbol}
          >
            {stockSymbols.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="priceThreshold"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Price Threshold
          </label>
          <input
            type="number"
            id="priceThreshold"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="direction"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Direction
          </label>
          <select
            id="direction"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setDirection(e.target.value)}
            defaultValue={direction}
          >
            <option value={"above"}>Above</option>
            <option value={"below"}>Below</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mt-3"
        >
          Create Alert
        </button>
      </form>
    </div>
  );
};

export default withAuth(AlertForm);
