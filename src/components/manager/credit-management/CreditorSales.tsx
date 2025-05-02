'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon, CurrencyDollarIcon, ScaleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/ui/modal';
import { Plus } from 'lucide-react';

// ... (keep existing interfaces)
interface Creditor {
  id: string;
  name: string;
  contact: string;
  creditLimit: number;
  balance: number;
}

type CreditorStatus = 'pending' | 'partially-paid' | 'paid';

interface CreditorSale {
  id: string;
  date: Date;
  creditorId: string;
  invoiceNumber: string;
  amount: number;
  fuelType: string;
  liters: number;
  pricePerLiter: number;
  status: CreditorStatus
  notes?: string;
}
const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const rowAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export function CreditorSales() {
  const [creditors, setCreditors] = useState<Creditor[]>([
    {
      id: '1',
      name: 'ABC Transport',
      contact: '0712345678',
      creditLimit: 50000,
      balance: 12500
    },
    // Add more creditors
  ]);

  const [sales, setSales] = useState<CreditorSale[]>([
    {
      id: '1',
      date: new Date('2024-07-20'),
      creditorId: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 12500,
      fuelType: 'Diesel 50ppm',
      liters: 592.41,
      pricePerLiter: 21.10,
      status: 'pending',
      notes: 'Monthly delivery'
    },
    // Add more sales
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<Partial<CreditorSale> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSale = () => {
    setCurrentSale({
      date: new Date(),
      status: 'pending'
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEditSale = (sale: CreditorSale) => {
    setCurrentSale(sale);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSale = () => {
    if (!currentSale) return;

    // Ensure status is properly typed
    const status: CreditorStatus = currentSale.status || 'pending';

    if (isEditing && currentSale.id) {
      // Update existing sale with proper status type
      setSales(sales.map(s => 
        s.id === currentSale.id ? { 
          ...s, 
          ...currentSale,
          status: status
        } : s
      ));
    } else {
      // Add new sale with proper status type
      const newSale: CreditorSale = {
        ...currentSale,
        id: Date.now().toString(),
        invoiceNumber: `INV-${new Date().getFullYear()}-${sales.length + 1}`,
        status: status,
        date: currentSale.date || new Date(),
        creditorId: currentSale.creditorId || '',
        fuelType: currentSale.fuelType || '',
        liters: currentSale.liters || 0,
        pricePerLiter: currentSale.pricePerLiter || 0,
        amount: currentSale.amount || 0
      } as CreditorSale;
      setSales([...sales, newSale]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteSale = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const handlePayment = (id: string, amount: number) => {
    const sale = sales.find(s => s.id === id);
    if (!sale) return;

    const newStatus: CreditorStatus = amount >= sale.amount ? 'paid' : 'partially-paid';

    const updatedSales = sales.map(s => 
      s.id === id ? { 
        ...s, 
        status: newStatus
      } : s
    );

    const creditor = creditors.find(c => c.id === sale.creditorId);
    if (creditor) {
      const updatedCreditors = creditors.map(c => 
        c.id === creditor.id ? { 
          ...c, 
          balance: Math.max(0, c.balance - amount) 
        } : c
      );
      setCreditors(updatedCreditors);
    }

    setSales(updatedSales);
  };

  const getStatusStyles = (status: CreditorStatus) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'partially-paid': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      default: return 'bg-rose-500/10 text-rose-600 border-rose-200';
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 p-6 bg-neutral-50 min-h-screen"
    >
      {/* Header and Actions */}
      <motion.div
        {...cardAnimation}
        className="flex justify-between items-center p-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
            <div className="p-3 bg-neutral-100 rounded-xl">
              <CurrencyDollarIcon className="h-8 w-8 text-neutral-600" />
            </div>
            Creditor Management
          </h2>
          <p className="text-neutral-600 mt-2">Manage creditor accounts and fuel sales</p>
        </div>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {}}
            className="px-4 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white rounded-lg text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus className="w-4 h-4" />
            New Sale
          </motion.button>
      </motion.div>
  
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          {...cardAnimation}
          className="bg-white p-5 rounded-xl border shadow-sm border-neutral-200"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-neutral-900">
                R
                {creditors
                  .reduce((sum, c) => sum + c.balance, 0)
                  .toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </motion.div>
  
        <motion.div
          {...cardAnimation}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 rounded-xl border shadow-sm border-neutral-200"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Active Creditors</p>
              <p className="text-2xl font-bold text-neutral-900">{creditors.length}</p>
            </div>
          </div>
        </motion.div>
  
        <motion.div
          {...cardAnimation}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-100 rounded-lg">
              <ScaleIcon className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Pending Invoices</p>
              <p className="text-2xl font-bold text-neutral-900">
                {sales.filter((s) => s.status !== "paid").length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
  
      {/* Sales Table */}
      <motion.div
        {...cardAnimation}
        className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {[
                  "Date",
                  "Creditor",
                  "Invoice",
                  "Fuel Type",
                  "Liters",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={header}
                    className={`px-6 py-4 text-left text-sm font-medium text-neutral-600 ${
                      index === 0 ? "rounded-tl-xl" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y shadow-sm divide-neutral-200">
              <AnimatePresence>
                {sales.map((sale) => {
                  const creditor = creditors.find((c) => c.id === sale.creditorId);
                  return (
                    <motion.tr
                      key={sale.id}
                      variants={rowAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {new Date(sale.date).toLocaleDateString("en-ZA")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">
                        {creditor?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 font-mono">
                        {sale.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {sale.fuelType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-neutral-600">
                        {sale.liters.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        L
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-neutral-900">
                        R
                        {sale.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`${getStatusStyles(
                            sale.status
                          )} px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit`}
                        >
                          {sale.status === "paid" && (
                            <CheckIcon className="h-4 w-4 text-neutral-600" />
                          )}
                          {sale.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        {/* Action buttons */}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
  
      {/* Creditor Balances */}
      <motion.div
        {...cardAnimation}
        className="bg-white rounded-xl p-6 border border-neutral-200"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-neutral-900">
          <UserGroupIcon className="h-6 w-6 text-neutral-600" />
          Creditor Accounts
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {[
                  "Creditor",
                  "Contact",
                  "Credit Limit",
                  "Balance",
                  "Available",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-neutral-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {creditors.map((creditor) => (
                <tr
                  key={creditor.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">
                    {creditor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                    {creditor.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-neutral-600">
                    R{creditor.creditLimit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-neutral-900">
                    R{creditor.balance.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-neutral-600">
                    R{(creditor.creditLimit - creditor.balance).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
  
      {/* Add/Edit Sale Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 max-w-2xl w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEditing ? "Edit" : "Add"} Creditor Sale
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1 rounded-full hover:bg-neutral-100 focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6 text-neutral-600" />
            </button>
          </div>
  
          {/* …the rest of the form, inputs and buttons… */}
        </motion.div>
      </Modal>
    </motion.div>
  );
  
 
}