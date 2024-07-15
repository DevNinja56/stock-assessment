import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchStockDetailsWithinRange } from "@/services/stockService";
import formatDate from "@/utils/formatDate";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = [
  {
    symbol: "AAPL",
    date: "2022-01-05",
    close: 174.92,
  },
  {
    symbol: "AAPL",
    date: "2022-01-04",
    close: 179.7,
  },
];

const StockChart = () => {
  const [chartData, setChartData] = useState();
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [fromDate, setFromDate] = useState("2022-01-04");
  const [toDate, setToDate] = useState("2023-01-10");

  // Options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  useEffect(() => {
    const getStockData = async () => {
      const data = await fetchStockDetailsWithinRange({
        from: fromDate,
        to: toDate,
        symbol: stockSymbol,
      });
      setChartData({
        labels: data.map((item) => item.date).reverse(), // reverse to ensure dates are in ascending order
        datasets: [
          {
            label: "AAPL Closing Prices",
            data: data.map((item) => item.close).reverse(), // reverse to match date order
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };
    getStockData();
  }, [fromDate, stockSymbol, toDate]);

  return (
    <div>
      <h2></h2>

      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">
        AAPL Stock Close Prices From {formatDate(fromDate)} To{" "}
        {formatDate(toDate)}
      </h1>

      {chartData ? (
        <Line
          className="bg-white p-5 rounded-md"
          data={chartData}
          options={options}
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
};

export default StockChart;
