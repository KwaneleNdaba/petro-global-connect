"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Payout {
  id: number;
  date: string;
  recipient: string;
  amount: number;
  method: string;
  status: "pending" | "completed" | "failed";
}

interface SummaryCard {
  label: string;
  amount: number;
}

interface Filters {
  startDate: string;
  endDate: string;
  status: string;
}

export default function Payouts() {
  const [summaryCards] = useState<SummaryCard[]>([
    { label: "Total Payouts", amount: 120000 },
    { label: "Pending", amount: 15000 },
    { label: "Completed", amount: 95000 },
    { label: "Failed", amount: 10000 },
  ]);

  const [payouts] = useState<Payout[]>([
    { id: 1, date: "2024-07-20", recipient: "John Doe", amount: 5000, method: "EFT", status: "completed" },
    { id: 2, date: "2024-07-21", recipient: "Jane Smith", amount: 2000, method: "Cash", status: "pending" },
    { id: 3, date: "2024-07-22", recipient: "Fuel Supplier", amount: 15000, method: "EFT", status: "failed" },
  ]);

  const [filters, setFilters] = useState<Filters>({
    startDate: "",
    endDate: "",
    status: "",
  });

  const filteredPayouts = useMemo(() => {
    return payouts.filter(payout => {
      return (
        (!filters.status || payout.status === filters.status) &&
        (!filters.startDate || payout.date >= filters.startDate) &&
        (!filters.endDate || payout.date <= filters.endDate)
      );
    });
  }, [payouts, filters]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR' 
    }).format(amount);
  };

  const statusClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-100';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-100';
      default:
        return '';
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-neutral-900">Payouts</h1>
        <p className="text-neutral-600">Track all payouts made from different stations.</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-white shadow-sm border border-neutral-200"
          >
            <p className="text-neutral-600 text-sm">{card.label}</p>
            <h2 className="text-2xl font-semibold text-neutral-900">
              {formatCurrency(card.amount)}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          type="date"
          name="startDate"
          className="p-2 bg-white rounded border border-neutral-300 text-neutral-900"
          value={filters.startDate}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="endDate"
          className="p-2 bg-white rounded border border-neutral-300 text-neutral-900"
          value={filters.endDate}
          onChange={handleFilterChange}
        />
        <select
          name="status"
          className="p-2 bg-white rounded border border-neutral-300 text-neutral-900"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </motion.div>

      {/* Payouts Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="overflow-x-auto bg-white rounded-lg shadow-sm border border-neutral-200"
      >
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
            <tr>
              <th className="p-3 text-left text-neutral-600 font-semibold">Date</th>
              <th className="p-3 text-left text-neutral-600 font-semibold">Recipient</th>
              <th className="p-3 text-left text-neutral-600 font-semibold">Amount</th>
              <th className="p-3 text-left text-neutral-600 font-semibold">Payment Method</th>
              <th className="p-3 text-left text-neutral-600 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredPayouts.map((payout, index) => (
              <motion.tr
                key={payout.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-neutral-50/50"
              >
                <td className="p-3 text-neutral-900">{payout.date}</td>
                <td className="p-3 text-neutral-900">{payout.recipient}</td>
                <td className="p-3 text-neutral-600">{formatCurrency(payout.amount)}</td>
                <td className="p-3 text-neutral-600">{payout.method}</td>
                <td className="p-3">
                  <span className={`${statusClass(payout.status)} px-2.5 py-1 rounded-full border text-xs font-medium inline-flex items-center gap-1.5`}>
                    {payout.status === "pending" && (
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    )}
                    {payout.status === "completed" && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                    {payout.status === "failed" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    {payout.status.toUpperCase()}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}