"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BarChart2, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Shortover {
  date: string;
  station: string;
  amount: number;
  reason: string;
}

export default function ShortoverOverview() {
  const [shortovers, setShortovers] = useState<Shortover[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShortovers = () => {
      // Simulate API call
      setTimeout(() => {
        setShortovers([
          { date: '2024-08-01', station: 'BP Johannesburg', amount: 5000, reason: 'Cash miscount' },
          { date: '2024-08-02', station: 'Shell Cape Town', amount: 3000, reason: 'System Error' },
          { date: '2024-08-03', station: 'Engen Durban', amount: 4500, reason: 'Fuel Leak' }
        ]);
        setIsLoading(false);
      }, 500);
    };

    fetchShortovers();
  }, []);

  const totalShortover = shortovers.reduce((sum, entry) => sum + entry.amount, 0);
  const highestShortover = Math.max(...shortovers.map(entry => entry.amount), 0);
  const shopsAffected = shortovers.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6 bg-neutral-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-200">
            <AlertTriangle className="h-6 w-6 text-neutral-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Shortover Overview</h1>
            <p className="text-neutral-500">Tracking financial discrepancies across all stations.</p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <h2 className="text-lg text-neutral-600">Total Shortover</h2>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalShortover)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg text-neutral-600">Highest Shortover</h2>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(highestShortover)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg text-neutral-600">Shops Affected</h2>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {shopsAffected}
          </p>
        </motion.div>
      </div>

      {/* Shortover Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="p-3 text-left text-neutral-600 font-semibold">Date</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Station</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Amount</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-neutral-500">
                    Loading shortover data...
                  </td>
                </tr>
              ) : shortovers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-neutral-500">
                    No shortover records found
                  </td>
                </tr>
              ) : (
                shortovers.map((entry, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="p-3 text-neutral-900">{entry.date}</td>
                    <td className="p-3 text-neutral-900">{entry.station}</td>
                    <td className="p-3 text-red-600 font-medium">
                      {formatCurrency(entry.amount)}
                    </td>
                    <td className="p-3 text-neutral-600">{entry.reason}</td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}