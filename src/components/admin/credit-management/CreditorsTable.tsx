"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";

interface Creditor {
  date: string;
  invoiceNumber: string;
  name: string;
  totalAmount: number;
  vatAmount: number;
  shop: number;
  bakery: number;
  consumables: number;
  repairs: number;
  other: number;
  description: string;
}

const rowAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

const headers = [
  'Date',
  'Invoice Number',
  'Creditor',
  'Total Amount',
  'VAT Amount',
  'Shop',
  'Bakery',
  'Consumables',
  'Repairs',
  'Other',
  'Description'
];

export default function CreditorsTable() {
  const [creditors, setCreditors] = useState<Creditor[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-za', {
      style: 'currency',
      currency: 'zar'
    }).format(amount);
  };

  const fetchCreditors = async () => {
    const data: Creditor[] = [
      {
        date: '20/06/2024',
        invoiceNumber: 'INVA MZ',
        name: 'MUHAMMED',
        totalAmount: 5000,
        vatAmount: 0,
        shop: 5000,
        bakery: 0,
        consumables: 0,
        repairs: 0,
        other: 0,
        description: ''
      },
      {
        date: '20/06/2024',
        invoiceNumber: 'LM20',
        name: 'JAMES',
        totalAmount: 200,
        vatAmount: 0,
        shop: 200,
        bakery: 0,
        consumables: 0,
        repairs: 0,
        other: 0,
        description: ''
      },
    ];
    setCreditors(data);
  };

  useEffect(() => {
    fetchCreditors();
  }, []);

  return (
    <div className="">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
            <div className="p-3 bg-neutral-100 rounded-xl">
              <CurrencyDollarIcon className="h-8 w-8 text-neutral-600" />
            </div>
            Creditor Management
          </h2>
          <p className="text-neutral-600 mb-2">Overview of all creditor transactions</p>
        </div>

      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
      >


        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Creditors</h1>
          <p className="text-neutral-600 mb-6">
            This is a list of all the creditors that have been debited from your account.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="p-3 text-left text-neutral-600 font-semibold whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200">
                {creditors.map((creditor, index) => (
                  <motion.tr
                    key={index}
                    variants={rowAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="p-3 text-neutral-900 whitespace-nowrap">{creditor.date}</td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap">{creditor.invoiceNumber}</td>
                    <td className="p-3 text-neutral-900 whitespace-nowrap">{creditor.name}</td>
                    <td className="p-3 text-right font-medium text-neutral-900 whitespace-nowrap">
                      {formatCurrency(creditor.totalAmount)}
                    </td>
                    <td className="p-3 text-right text-neutral-600 whitespace-nowrap">
                      {formatCurrency(creditor.vatAmount)}
                    </td>
                    <td className="p-3 text-right text-neutral-600 whitespace-nowrap">
                      {formatCurrency(creditor.shop)}
                    </td>
                    <td className="p-3 text-right text-neutral-600 whitespace-nowrap">
                      {formatCurrency(creditor.bakery)}
                    </td>
                    <td className="p-3 text-right text-neutral-600 whitespace-nowrap">
                      {formatCurrency(creditor.consumables)}
                    </td>
                    <td className="p-3 text-right text-neutral-600 whitespace-nowrap">
                      {formatCurrency(creditor.repairs)}
                    </td>
                    <td className="p-3 text-right text-neutral-600 whitespace-nowrap">
                      {formatCurrency(creditor.other)}
                    </td>
                    <td className="p-3 flex items-center whitespace-nowrap text-neutral-600">
                      <Info className="w-4 h-4 text-neutral-400 mr-2" />
                      {creditor.description || 'N/A'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {creditors.length === 0 && (
            <div className="p-8 text-center text-neutral-600 flex flex-col items-center">
              <Info className="w-12 h-12 text-neutral-400 mb-4" />
              <p>No creditors found</p>
              <p className="text-sm mt-1">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}