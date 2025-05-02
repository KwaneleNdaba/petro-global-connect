"use client";
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Link from 'next/link';
import { 
    HandCoins, 
    CreditCard, 
    BookOpen, 
    PieChart, 
    TrendingUp 
} from 'lucide-react';

interface DataType {
  sales: number;
  creditCard: number;
  accounts: number;
  payouts: number;
}

const colors = {
  sales: '#4ade80',
  creditCard: '#f97316',
  accounts: '#ec4899',
  payouts: '#3b82f6',
};

const InsightsPanel = () => {
  const data: DataType = {
    sales: 243297.62,
    creditCard: 64731.74,
    accounts: 7406.62,
    payouts: 2725.48,
  };

  const total = useMemo(() => 
    Object.values(data).reduce((sum, value) => sum + value, 0), 
    [data]
  );

  const getPercentage = (value: number) => (value / total) * 100;

  const percentages = useMemo(() => ({
    sales: getPercentage(data.sales),
    creditCard: getPercentage(data.creditCard),
    accounts: getPercentage(data.accounts),
    payouts: getPercentage(data.payouts),
  }), [data, total]);

  const legendItems = [
    { name: 'Sales', color: colors.sales },
    { name: 'Credit Card / EFT', color: colors.creditCard },
    { name: 'Accounts', color: colors.accounts },
    { name: 'Payouts', color: colors.payouts },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const insightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-white p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Chart & Summary */}
        <motion.div 
          className="lg:w-2/5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Overview</h2>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="relative w-full aspect-square">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors.sales}
                  strokeWidth="20"
                  strokeDasharray={`${percentages.sales} ${100 - percentages.sales}`}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${percentages.sales} ${100 - percentages.sales}` }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors.creditCard}
                  strokeWidth="20"
                  strokeDasharray={`${percentages.creditCard} ${100 - percentages.creditCard}`}
                  strokeDashoffset={-percentages.sales}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${percentages.creditCard} ${100 - percentages.creditCard}` }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors.accounts}
                  strokeWidth="20"
                  strokeDasharray={`${percentages.accounts} ${100 - percentages.accounts}`}
                  strokeDashoffset={-percentages.sales - percentages.creditCard}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${percentages.accounts} ${100 - percentages.accounts}` }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors.payouts}
                  strokeWidth="20"
                  strokeDasharray={`${percentages.payouts} ${100 - percentages.payouts}`}
                  strokeDashoffset={-percentages.sales - percentages.creditCard - percentages.accounts}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${percentages.payouts} ${100 - percentages.payouts}` }}
                  transition={{ duration: 1 }}
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-gray-500 text-sm">Total</div>
                <div className="text-2xl font-bold text-gray-800">
                  {formatCurrency(total)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {legendItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm"
                  variants={insightVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 text-sm">{item.name}</span>
                  <span className="ml-auto text-sm font-medium text-gray-700">
                    {formatCurrency(data[item.name.toLowerCase().replace(/ /g, '') as keyof DataType])}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Insights */}
        <div className="lg:w-3/5">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-neutral-900">Key Insights</h2>
    <div className="text-sm text-neutral-600">Updated 1h ago</div>
  </div>

  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
    initial="hidden"
    animate="visible"
    variants={{ visible: { transition: { staggerChildren: 0.1 } }}}
  >
    {[
      {
        title: "Sales",
        icon: <HandCoins className="w-5 h-5 text-neutral-600" />,
        href: "/admin",
        content: "Diesel fuel sales are the highest, contributing significantly to total revenue."
      },
      {
        title: "Credit Card / EFT",
        icon: <CreditCard className="w-5 h-5 text-neutral-600" />,
        href: "/admin/transactions",
        content: "Substantial volume in cashless transactions indicating customer preference."
      },
      {
        title: "Accounts",
        icon: <BookOpen className="w-5 h-5 text-neutral-600" />,
        href: "/admin/accounts",
        content: "Steady accounts receivable influx with VW Used Cars."
      },
      {
        title: "Payouts",
        icon: <TrendingUp className="w-5 h-5 text-neutral-600" />,
        href: "/admin/payouts",
        content: "Consistent payout patterns with scheduled distributions."
      }
    ].map((item, index) => (
      <Link href={item.href} passHref key={index}>
        <motion.div
          className="p-4 h-full rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm hover:shadow-md"
          variants={insightVariants}
          whileHover={{ y: -2 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-neutral-100 rounded-lg">
              {item.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    ))}
  </motion.div>
</div>

      </div>
    </div>
  );
};

export default InsightsPanel;