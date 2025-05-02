'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame, Zap, Wallet, ShoppingBag, Fuel, History, ArrowUpDown } from 'lucide-react';

interface HistoricalData {
  date: string;
  fuel95: number;
  fuel93: number;
  diesel: number;
  shopSales: number;
  expenses: number;
}

const DailyReport = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'history'>('daily');
  const [filterDate, setFilterDate] = useState<'week' | 'month' | 'year'>('week');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Form States
  const [fuel95, setFuel95] = useState<number>(0);
  const [fuel93, setFuel93] = useState<number>(0);
  const [diesel, setDiesel] = useState<number>(0);
  const [shopSales, setShopSales] = useState<number>(0);
  const [fuelExpenses, setFuelExpenses] = useState<number>(0);
  const [shopExpenses, setShopExpenses] = useState<number>(0);

  const historicalData: HistoricalData[] = [
    { date: '2024-02-06', fuel95: 25000, fuel93: 18000, diesel: 30000, shopSales: 15000, expenses: 65000 },
    { date: '2024-02-07', fuel95: 27000, fuel93: 19500, diesel: 32000, shopSales: 16000, expenses: 68000 },
    { date: '2024-02-08', fuel95: 24000, fuel93: 17800, diesel: 29000, shopSales: 14500, expenses: 62000 },
    { date: '2024-02-09', fuel95: 26000, fuel93: 18900, diesel: 31000, shopSales: 15800, expenses: 66000 },
    { date: '2024-02-10', fuel95: 28000, fuel93: 20000, diesel: 33000, shopSales: 16500, expenses: 70000 },
    { date: '2024-02-11', fuel95: 25500, fuel93: 18500, diesel: 30500, shopSales: 15200, expenses: 64000 },
    { date: '2024-02-12', fuel95: 26800, fuel93: 19200, diesel: 31800, shopSales: 15900, expenses: 67000 },
  ];

  // Computed values
  const yesterdayData = historicalData[historicalData.length - 2];
  const totalFuelSales = useMemo(() => (
    (fuel95 || 0) + (fuel93 || 0) + (diesel || 0)
  ).toFixed(2), [fuel95, fuel93, diesel]);

  const totalSales = useMemo(() => (
    parseFloat(totalFuelSales) + (shopSales || 0)
  ).toFixed(2), [totalFuelSales, shopSales]);

  const totalExpenses = useMemo(() => (
    (fuelExpenses || 0) + (shopExpenses || 0)
  ).toFixed(2), [fuelExpenses, shopExpenses]);

  const netProfit = useMemo(() => (
    parseFloat(totalSales) - parseFloat(totalExpenses)
  ).toFixed(2), [totalSales, totalExpenses]);

  const submitReport = () => {
    if (!fuel95 || !fuel93 || !diesel || !shopSales || !fuelExpenses || !shopExpenses) {
      alert('Please fill in all required fields.');
      return;
    }
    // Submit logic here
    alert('Report submitted successfully!');
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

return (
  <div className="min-h-screen bg-neutral-50 p-6">
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <Fuel className="w-6 h-6 text-neutral-600" />
            Daily Station Report
          </h1>
          <p className="text-neutral-600 mt-1">
            Manage daily operations and historical data
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("daily")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === "daily"
                ? "bg-neutral-600 text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <Zap className="w-4 h-4" />
            Daily Entry
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === "history"
                ? "bg-neutral-600 text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>
      </motion.div>

      {/* Yesterday's Summary */}
      <motion.div
        {...cardAnimation}
        className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-neutral-600" />
          Yesterday's Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Fuel 95", value: yesterdayData.fuel95 },
            { label: "Fuel 93", value: yesterdayData.fuel93 },
            { label: "Diesel", value: yesterdayData.diesel },
            { label: "Shop Sales", value: yesterdayData.shopSales },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-neutral-100 flex flex-col"
            >
              <p className="text-sm text-neutral-600">{item.label}</p>
              <p className="text-xl font-semibold text-neutral-900 mt-1">
                R {item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {activeTab === "daily" ? (
        <motion.div {...cardAnimation} className="space-y-6">
          {/* Date Picker */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neutral-400" />
              Report Date
            </label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-neutral-600 text-neutral-700"
            />
          </div>

          {/* Sales Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-neutral-600" />
              Fuel Sales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Fuel 95 (R)"
                value={fuel95}
                onChange={(value) => setFuel95(Number(value))}
                icon={<Flame className="w-5 h-5 text-neutral-600" />}
              />
              <InputField
                label="Fuel 93 (R)"
                value={fuel93}
                onChange={(value) => setFuel93(Number(value))}
                icon={<Flame className="w-5 h-5 text-neutral-600" />}
              />
              <InputField
                label="Diesel (R)"
                value={diesel}
                onChange={(value) => setDiesel(Number(value))}
                icon={<Flame className="w-5 h-5 text-neutral-600" />}
              />
            </div>

            <div className="mt-4">
              <InputField
                label="Shop Sales (R)"
                value={shopSales}
                onChange={(value) => setShopSales(Number(value))}
                icon={<ShoppingBag className="w-5 h-5 text-neutral-600" />}
              />
            </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-neutral-600" />
              Expenses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Fuel Expenses (R)"
                value={fuelExpenses}
                onChange={(value) => setFuelExpenses(Number(value))}
                icon={<Zap className="w-5 h-5 text-neutral-600" />}
              />
              <InputField
                label="Shop Expenses (R)"
                value={shopExpenses}
                onChange={(value) => setShopExpenses(Number(value))}
                icon={<Wallet className="w-5 h-5 text-neutral-600" />}
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard
              label="Total Fuel Sales"
              value={totalFuelSales}
              className="bg-neutral-100 text-neutral-900"
            />
            <SummaryCard
              label="Total Sales"
              value={totalSales}
              className="bg-neutral-100 text-neutral-900"
            />
            <SummaryCard
              label="Total Expenses"
              value={totalExpenses}
              className="bg-neutral-100 text-neutral-900"
            />
            <SummaryCard
              label="Net Profit"
              value={netProfit}
              className="bg-neutral-100 text-neutral-900"
            />
          </div>

          <button
            onClick={submitReport}
            className="w-full bg-neutral-600 hover:bg-neutral-700 text-white p-4 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <ArrowUpDown className="w-5 h-5 text-white" />
            Submit Daily Report
          </button>
        </motion.div>
      ) : (
        <motion.div
          {...cardAnimation}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Historical Transactions
            </h3>
            <div className="flex gap-2">
              {(["week", "month", "year"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setFilterDate(period)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filterDate === period
                      ? "bg-neutral-600 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="p-3 text-left text-sm text-neutral-600">
                    Date
                  </th>
                  <th className="p-3 text-right text-sm text-neutral-600">
                    Fuel 95
                  </th>
                  <th className="p-3 text-right text-sm text-neutral-600">
                    Fuel 93
                  </th>
                  <th className="p-3 text-right text-sm text-neutral-600">
                    Diesel
                  </th>
                  <th className="p-3 text-right text-sm text-neutral-600">
                    Shop Sales
                  </th>
                  <th className="p-3 text-right text-sm text-neutral-600">
                    Expenses
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {historicalData.map((record) => (
                  <tr
                    key={record.date}
                    className="border-t border-neutral-200 hover:bg-neutral-50"
                  >
                    <td className="p-3 text-neutral-700">{record.date}</td>
                    <td className="p-3 text-right text-neutral-700">
                      R {record.fuel95.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-neutral-700">
                      R {record.fuel93.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-neutral-700">
                      R {record.diesel.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-neutral-700">
                      R {record.shopSales.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-neutral-700">
                      R {record.expenses.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

};

// Reusable Input Component
const InputField = ({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

// Reusable Summary Card Component
const SummaryCard = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) => (
  <motion.div
    initial={{ scale: 0.95 }}
    animate={{ scale: 1 }}
    className={`p-4 rounded-xl ${className}`}
  >
    <p className="text-sm font-medium">{label}</p>
    <p className="text-xl font-bold mt-1">R {parseFloat(value).toLocaleString()}</p>
  </motion.div>
);

export default DailyReport;