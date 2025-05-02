"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { CreditCard, Banknote, DollarSign } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  method: string;
  amount: number;
}

export default function CardEftTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const data: Transaction[] = [
      { date: '2024-07-30', id: 'TXN12345', method: 'Credit Card', amount: 450 },
      { date: '2024-07-29', id: 'TXN12346', method: 'EFT', amount: 1000 },
      { date: '2024-07-28', id: 'TXN12347', method: 'Credit Card', amount: 200 },
    ];
    setTransactions(data);
  };

  const totalTransactions = useMemo(() => transactions.length, [transactions]);
  const totalRevenue = useMemo(() => 
    transactions.reduce((sum, txn) => sum + txn.amount, 0), 
    [transactions]
  );
  const avgTransaction = useMemo(() => 
    (totalRevenue / (totalTransactions || 1)).toFixed(2), 
    [totalRevenue, totalTransactions]
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Card / EFT Transactions</h1>
        <p className="text-neutral-600 mb-6">Overview of all digital transactions made through Card or EFT.</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          {...cardAnimation}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-800">Total Transactions</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{totalTransactions}</p>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Banknote className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-800">Total Revenue</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{formatCurrency(totalRevenue)}</p>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-800">Avg Transaction</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{formatCurrency(parseFloat(avgTransaction))}</p>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
              <tr>
                <th className="p-3 text-left text-neutral-600 font-semibold">Date</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Transaction ID</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Payment Method</th>
                <th className="p-3 text-right text-neutral-600 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50/50"
                >
                  <td className="p-3 text-neutral-900">{transaction.date}</td>
                  <td className="p-3 text-neutral-900">{transaction.id}</td>
                  <td className="p-3 text-neutral-600">{transaction.method}</td>
                  <td className="p-3 text-right text-neutral-600">
                    {formatCurrency(transaction.amount)}
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

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};