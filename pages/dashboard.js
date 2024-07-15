import React from "react";
import AlertForm from "@/components/alertForm";
import AppNavbar from "@/components/common/appNavbar";
import StockChart from "@/components/stockChart";
import StockTable from "@/components/stockTable";
import withAuth from "@/hoc/withAuth";

const Dashboard = () => {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 min-h-[100vh]">
      <AppNavbar />

      <div className="w-[50%] mx-auto my-20 py-7">
        <StockTable />
      </div>

      <div className="w-[80%] mx-auto pb-16 ">
        <StockChart />
      </div>

      <AlertForm />
    </div>
  );
};

export default withAuth(Dashboard);
