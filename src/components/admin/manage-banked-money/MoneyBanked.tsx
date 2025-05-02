"use client";

import { motion } from "framer-motion";
import { Banknote, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: number;
  date: string;
  bank: string;
  amount: number;
  method: string;
  status: "Completed" | "Pending" | "Failed";
}

export default function MoneyBanked() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2025-02-06', bank: 'ABSA', amount: 5000, method: 'EFT', status: 'Completed' },
    { id: 2, date: '2025-02-06', bank: 'FNB', amount: 3200, method: 'Cash', status: 'Pending' },
    { id: 3, date: '2025-02-05', bank: 'Standard Bank', amount: 7800, method: 'EFT', status: 'Completed' },
    { id: 4, date: '2025-02-04', bank: 'Nedbank', amount: 1500, method: 'Cash', status: 'Failed' },
  ]);

  const totalBanked = transactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingDeposits = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);
  const todaysDeposits = transactions.filter(t => t.date === '2025-02-06').reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const getStatusClass = (status: Transaction["status"]) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50 border-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'Failed':
        return 'text-red-600 bg-red-50 border-red-100';
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'Pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'Failed':
        return <AlertTriangle className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-200">
            <Banknote className="h-6 w-6 text-neutral-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Money Banked</h1>
            <p className="text-neutral-500">Track all your banked money, pending transactions, and deposit trends.</p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <p className="text-neutral-500 text-sm">Total Banked</p>
          <h2 className="text-xl font-bold text-neutral-900 mt-1">{formatCurrency(totalBanked)}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <p className="text-neutral-500 text-sm">Pending Deposits</p>
          <h2 className="text-xl font-bold text-yellow-600 mt-1">{formatCurrency(pendingDeposits)}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <p className="text-neutral-500 text-sm">Today's Deposits</p>
          <h2 className="text-xl font-bold text-green-600 mt-1">{formatCurrency(todaysDeposits)}</h2>
        </motion.div>
      </div>

      {/* Transactions Table */}
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
                <th className="p-3 text-left text-neutral-600 font-semibold">Bank</th>
                <th className="p-3 text-right text-neutral-600 font-semibold">Amount</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Method</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="p-3 text-neutral-900">{transaction.date}</td>
                  <td className="p-3 text-neutral-900">{transaction.bank}</td>
                  <td className="p-3 text-right text-neutral-900 font-medium">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="p-3 text-neutral-600">{transaction.method}</td>
                  <td className="p-3">
                    <span className={`${getStatusClass(transaction.status)} px-2.5 py-1 rounded-full border text-xs font-medium inline-flex items-center`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}