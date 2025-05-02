"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";

interface Account {
  id: number;
  name: string;
  balance: number;
  lastUpdated: string;
}

interface Transaction {
  id: number;
  date: string;
  shop: string;
  type: string;
  amount: number;
}

const rowAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export default function BankingOverview() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: "Main Account", balance: 500000, lastUpdated: "Today" },
    { id: 2, name: "Fuel Station 1", balance: 120000, lastUpdated: "Today" },
    { id: 3, name: "Convenience Store", balance: 80000, lastUpdated: "Yesterday" }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: "2024-08-06", shop: "Fuel Station 1", type: "Deposit", amount: 15000 },
    { id: 2, date: "2024-08-05", shop: "Convenience Store", type: "Withdrawal", amount: -5000 },
    { id: 3, date: "2024-08-05", shop: "Main Account", type: "Payment", amount: -10000 }
  ]);

  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction =>
      transaction.shop.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  };

  const getTransactionClass = (type: string) => {
    return type === "Deposit" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="p-6 min-h-screen bg-neutral-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-200">
            <CurrencyDollarIcon className="h-8 w-8 text-neutral-700" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Banking Overview</h1>
        </div>
      </motion.div>

      {/* Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      >
        {accounts.map((account) => (
          <div key={account.id} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2 text-neutral-800">{account.name}</h2>
            <p className="text-xl font-bold text-green-600">{formatCurrency(account.balance)}</p>
            <p className="text-neutral-500 mt-1 text-sm">Last updated: {account.lastUpdated}</p>
          </div>
        ))}
      </motion.div>

      {/* Transaction Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Transactions</h2>
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full p-2 pl-10 bg-neutral-50 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border border-neutral-300"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Date</th>
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Shop</th>
                <th className="py-3 px-4 text-neutral-600 font-medium text-sm">Type</th>
                <th className="py-3 px-4 text-right text-neutral-600 font-medium text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  variants={rowAnimation}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-3 px-4 text-neutral-800">{transaction.date}</td>
                  <td className="py-3 px-4 text-neutral-800">{transaction.shop}</td>
                  <td className="py-3 px-4">
                    <span className={`${getTransactionClass(transaction.type)} font-medium`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-neutral-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="py-8 text-center text-neutral-500">
            <p>No transactions found</p>
            {search && (
              <p className="text-sm mt-1">
                Try adjusting your search term
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}