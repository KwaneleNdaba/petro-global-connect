'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, PencilIcon, TrashIcon, CheckIcon, 
  XMarkIcon, CurrencyDollarIcon, ScaleIcon, 
  UserGroupIcon, TruckIcon 
} from '@heroicons/react/24/outline';
import { FuelIcon } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { toast } from 'sonner';

interface Creditor {
  id: string;
  name: string;
  contact: string;
  creditLimit: number;
  balance: number;
  avatarColor: string;
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
  status: CreditorStatus;
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

const fuelTypes = ['Diesel 50ppm', 'Fuel 95', 'Fuel 93', 'Diesel 500ppm'];

export function CreditorSales() {
  const [creditors, setCreditors] = useState<Creditor[]>([
    {
      id: '1',
      name: 'ABC Transport',
      contact: '0712345678',
      creditLimit: 50000,
      balance: 12500,
      avatarColor: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'City Logistics',
      contact: '0723456789',
      creditLimit: 75000,
      balance: 32500,
      avatarColor: 'bg-green-500'
    },
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentSale?.liters && currentSale?.pricePerLiter) {
      setCurrentSale((prev:any) => ({
        ...prev,
        amount: Number((prev.liters! * prev.pricePerLiter!).toFixed(2))
      }));
    }
  }, [currentSale?.liters, currentSale?.pricePerLiter]);

  const handleAddSale = () => {
    setCurrentSale({
      date: new Date(),
      status: 'pending',
      liters: 0,
      pricePerLiter: 0,
      amount: 0
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditSale = (sale: CreditorSale) => {
    setCurrentSale(sale);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const validateSale = () => {
    if (!currentSale?.creditorId) {
      toast.error('Please select a creditor');
      return false;
    }
    if (!currentSale.fuelType) {
      toast.error('Please select fuel type');
      return false;
    }
    if (currentSale.liters! <= 0) {
      toast.error('Please enter valid liters');
      return false;
    }
    return true;
  };

  const handleSaveSale = () => {
    if (!validateSale()) return;

    const saleData = {
      ...currentSale,
      date: currentSale.date || new Date(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${sales.length + 1}`,
      amount: Number(currentSale.amount!.toFixed(2)),
    };

    setSales(prev => isEditing
      ? prev.map(s => s.id === saleData.id ? saleData as CreditorSale : s)
      : [...prev, { ...saleData, id: Date.now().toString() } as CreditorSale]
    );

    if (!isEditing) {
      const creditor = creditors.find(c => c.id === saleData.creditorId);
      if (creditor) {
        setCreditors(prev => prev.map(c => c.id === creditor.id 
          ? { ...c, balance: c.balance + saleData.amount! }
          : c
        ));
      }
    }

    toast.success(`Sale ${isEditing ? 'updated' : 'added'} successfully`);
    setIsModalOpen(false);
  };

  const handleDeleteSale = (id: string) => {
    setSales(prev => prev.filter(s => s.id !== id));
    toast.success('Sale deleted');
  };

  const handlePayment = async (saleId: string) => {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;

    const creditor = creditors.find(c => c.id === sale.creditorId);
    if (!creditor) return;

    const remaining = sale.amount - (creditor.creditLimit - creditor.balance);
    const paymentAmount = parseFloat(
      prompt(`Enter payment amount (max: R${remaining.toFixed(2)}):`) || '0'
    );

    if (paymentAmount <= 0 || paymentAmount > remaining) {
      toast.error('Invalid payment amount');
      return;
    }

    const newStatus: CreditorStatus = paymentAmount >= sale.amount ? 'paid' : 'partially-paid';

    setSales(prev => prev.map(s => 
      s.id === saleId ? { ...s, status: newStatus } : s
    ));

    setCreditors(prev => prev.map(c => 
      c.id === creditor.id ? { ...c, balance: c.balance - paymentAmount } : c
    ));

    toast.success(`Payment of R${paymentAmount.toFixed(2)} recorded`);
  };

  const getStatusStyles = (status: CreditorStatus) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'partially-paid': return 'bg-amber-100 text-amber-800';
      default: return 'bg-rose-100 text-rose-800';
    }
  };

  const filteredSales = sales.filter(sale => {
    const creditor = creditors.find(c => c.id === sale.creditorId);
    return creditor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
  });



  

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6 p-6 bg-neutral-50 min-h-screen"
    >
      {/* Header Section */}
      <motion.div {...cardAnimation} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Creditor Sales Management
            </h1>
            <p className="text-neutral-600 mt-2">Manage fuel sales and creditor accounts</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddSale}
            className="px-4 py-2 bg-neutral-600 text-white rounded-lg flex items-center gap-2 hover:bg-neutral-700"
          >
            <PlusIcon className="h-5 w-5" />
            New Sale
          </motion.button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search sales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:ring-1 focus:ring-neutral-400 bg-white"
          />
          <TruckIcon className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: CurrencyDollarIcon,
            title: 'Total Sales Value',
            value: sales.reduce((sum, s) => sum + s.amount, 0).toLocaleString(),
            bg: 'bg-neutral-100'
          },
          {
            icon: ScaleIcon,
            title: 'Average Transaction',
            value: (sales.reduce((sum, s) => sum + s.amount, 0) / (sales.length || 1)).toFixed(2),
            bg: 'bg-neutral-100'
          },
          {
            icon: UserGroupIcon,
            title: 'Active Creditors',
            value: creditors.length,
            bg: 'bg-neutral-100'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            {...cardAnimation}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 ${stat.bg} rounded-lg`}>
                <stat.icon className="h-6 w-6 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {stat.title.includes('Value') ? 'R' : ''}{stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Table */}
      <motion.div
        {...cardAnimation}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                {['Date', 'Creditor', 'Fuel', 'Liters', 'Amount', 'Status'].map((header) => (
                  <th 
                    key={header} 
                    className="px-6 py-4 text-left text-sm font-medium text-neutral-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <AnimatePresence>
                {filteredSales.map((sale) => {
                  const creditor = creditors.find(c => c.id === sale.creditorId);
                  return (
                    <motion.tr
                      key={sale.id}
                      variants={rowAnimation}
                      className="hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-900">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-neutral-600">
                              {creditor?.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-neutral-900">
                            {creditor?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                        {sale.fuelType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                        {sale.liters.toLocaleString()} L
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">
                        R{sale.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={sale.status}
                          onChange={(e) => setSales(prev => prev.map(s => 
                            s.id === sale.id ? { ...s, status: e.target.value as CreditorStatus } : s
                          ))}
                          className={`${getStatusStyles(sale.status)} px-3 py-1 rounded-full text-sm cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="partially-paid">Partially Paid</option>
                          <option value="paid">Paid</option>
                        </select>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Sale Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.2 }}
    className=" max-w-2xl w-full  "
  >
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
      <h2 className="text-2xl font-bold text-neutral-800">
        {isEditing ? 'Edit' : 'New'} Fuel Sale
      </h2>
      <button
        onClick={() => setIsModalOpen(false)}
        className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
      >
        <XMarkIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
      </button>
    </div>

    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Creditor
          </label>
          <select
            value={currentSale?.creditorId || ''}
            onChange={(e) => setCurrentSale((prev: any) => ({ ...prev, creditorId: e.target.value }))}
            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">Select Creditor</option>
            {creditors.map(creditor => (
              <option key={creditor.id} value={creditor.id}>
                {creditor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Fuel Type
          </label>
          <select
            value={currentSale?.fuelType || ''}
            onChange={(e) => setCurrentSale((prev: any) => ({ ...prev, fuelType: e.target.value }))}
            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">Select Type</option>
            {fuelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Liters
          </label>
          <div className="relative">
            <input
              type="number"
              value={currentSale?.liters || ''}
              onChange={(e) => setCurrentSale((prev: any) => ({
                ...prev,
                liters: parseFloat(e.target.value)
              }))}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
              placeholder="0.00"
            />
            <span className="absolute right-3 top-3 text-neutral-500">L</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Price/Liter
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-neutral-500">R</span>
            <input
              type="number"
              step="0.01"
              value={currentSale?.pricePerLiter || ''}
              onChange={(e) => setCurrentSale((prev: any) => ({
                ...prev,
                pricePerLiter: parseFloat(e.target.value)
              }))}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-8"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Total Amount
        </label>
        <div className="relative">
          <input
            type="text"
            value={`R ${currentSale?.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}`}
            readOnly
            className="w-full p-3 border border-neutral-300 rounded-lg bg-neutral-50 font-medium text-neutral-800 pl-8"
          />
          <span className="absolute left-3 top-3 text-neutral-500">
            <CurrencyDollarIcon className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(false)}
          className="px-5 py-2.5 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveSale}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          {isEditing ? 'Save Changes' : 'Create Sale'}
        </motion.button>
      </div>
    </div>
  </motion.div>
</Modal>
    </motion.div>
  );
}