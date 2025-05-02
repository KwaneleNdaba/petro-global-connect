"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FuelIcon, RefreshCwIcon } from "lucide-react";

interface FuelTransaction {
  date: string;
  type: string;
  liters: number;
  station: string;
}

const rowAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export default function FuelStock() {
  const [totalFuelStock, setTotalFuelStock] = useState(50000);
  const [dailyUsage, setDailyUsage] = useState(2000);
  const [lastRestock, setLastRestock] = useState("2024-07-15");
  const [fuelTransactions, setFuelTransactions] = useState<FuelTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFuelData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data: FuelTransaction[] = [
      { date: "2024-07-20", type: "Restock", liters: 10000, station: "Main Station" },
      { date: "2024-07-19", type: "Sale", liters: 3000, station: "Downtown Station" },
      { date: "2024-07-18", type: "Restock", liters: 8000, station: "Uptown Station" },
      { date: "2024-07-17", type: "Sale", liters: 2500, station: "Main Station" },
    ];
    
    setFuelTransactions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFuelData();
  }, []);

  const handleRefresh = () => {
    fetchFuelData();
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-200">
              <FuelIcon className="h-6 w-6 text-neutral-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Fuel Stock</h1>
              <p className="text-neutral-500">Monitor fuel levels and transactions across your stations.</p>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <RefreshCwIcon className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Fuel Stock Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-neutral-700">Total Fuel Stock</h2>
          <p className="text-4xl font-bold mt-2 text-neutral-900">{totalFuelStock.toLocaleString()} L</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-neutral-700">Daily Usage</h2>
          <p className="text-4xl font-bold mt-2 text-neutral-900">{dailyUsage.toLocaleString()} L</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-neutral-700">Last Restock</h2>
          <p className="text-4xl font-bold mt-2 text-neutral-900">{lastRestock}</p>
        </div>
      </motion.div>

      {/* Fuel Stock Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white overflow-hidden rounded-lg shadow-sm border border-neutral-200"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Date</th>
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Transaction Type</th>
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Liters</th>
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Station</th>
              </tr>
            </thead>
            <tbody>
              {fuelTransactions.map((transaction, index) => (
                <motion.tr
                  key={index}
                  variants={rowAnimation}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-3 px-4 text-neutral-800">{transaction.date}</td>
                  <td className="py-3 px-4 text-neutral-800">
                    <span className={`font-medium ${
                      transaction.type === "Restock" ? "text-green-600" : "text-blue-600"
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-800">{transaction.liters.toLocaleString()} L</td>
                  <td className="py-3 px-4 text-neutral-800">{transaction.station}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-8 text-center text-neutral-500">
            <p>Loading fuel data...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && fuelTransactions.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            <p>No fuel transactions found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}