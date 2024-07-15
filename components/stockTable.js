import { fetchIndicesOverview } from "@/services/stockService";
import React, { useEffect, useState } from "react";

const StockTable = () => {
  const [indices, setIndices] = useState(null);
  const [indicesSymbols, setIndicesSymbols] = useState(["AAPL", "TSLA"]);
  const [fieldsToFetch, setFieldsToFetch] = useState([
    "name",
    "symbol",
    "price",
  ]);

  useEffect(() => {
    const getIndices = async () => {
      const data = await fetchIndicesOverview({
        indicesSymbols,
        fieldsToFetch,
      });
      setIndices(data);
    };
    getIndices();
  }, [fieldsToFetch, indicesSymbols]);

  return (
    <>
      {indices ? (
        <div className="relative overflow-x-auto text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Indices Records
          </h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {fieldsToFetch.map((field) => (
                  <th key={field} scope="col" className="px-6 py-3">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {indices.map((stock, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {fieldsToFetch.map((field) => {
                      return (
                        <td
                          key={field}
                          className={`px-6 py-4 ${
                            field === "name"
                              ? "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              : ""
                          }`}
                        >
                          {stock[field]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {indices?.length && indices?.length < 1 && (
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white text-center">
                  No Indices Found
                </h1>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white text-center">
          Loading Stock Data ...
        </h1>
      )}
    </>
  );
};

export default StockTable;
