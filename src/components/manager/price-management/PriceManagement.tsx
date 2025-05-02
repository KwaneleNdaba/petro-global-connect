'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fuel, ShoppingCart, Wrench, Save, TrendingUp, TrendingDown, Droplet, Package } from 'lucide-react';

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

interface Product {
  name: string;
  price: number;
  type: 'fuel' | 'product';
}

interface StoreProduct {
  id: number;
  name: string;
  category: string;
  currentPrice: number;
  newPrice: number;
  lastUpdated: string;
}

interface GarageService {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
}

const PriceManagement = () => {
  const [fuelProducts, setFuelProducts] = useState<Product[]>([
    { name: "Fuel 95", price: 4, type: 'fuel' },
    { name: "Fuel 93", price: 6, type: 'fuel' },
    { name: "Diesel", price: 4, type: 'fuel' },
  ]);

  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([
    { id: 1, name: "Coca-Cola", category: "Beverages", currentPrice: 2.5, newPrice: 2.5, lastUpdated: "2025-02-12" },
    { id: 2, name: "Chips", category: "Snacks", currentPrice: 1.99, newPrice: 1.99, lastUpdated: "2025-02-12" },
    { id: 3, name: "Energy Drink", category: "Beverages", currentPrice: 3.99, newPrice: 3.99, lastUpdated: "2025-02-11" },
  ]);

  const [garageServices,setGarageServices] = useState<GarageService[]>([
    { id: 1, name: "Oil Change", description: "Full synthetic oil change service", category: "Essential", price: 49.99, unit: "service" },
    { id: 2, name: "Tire Rotation", description: "Complete tire rotation and balance", category: "Essential", price: 29.99, unit: "service" },
    { id: 3, name: "Car Wash", description: "Premium exterior and interior cleaning", category: "Premium", price: 24.99, unit: "service" },
  ]);

  const [showNotification, setShowNotification] = useState(false);

  const calculateChange = (oldPrice: number, newPrice: number) => {
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    return change.toFixed(1);
  };

  const saveAllChanges = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getPriceChangeStyle = (change: string) => {
    const value = parseFloat(change);
    if (value > 0) return 'text-green-600 bg-green-100/50 border-green-200';
    if (value < 0) return 'text-red-600 bg-red-100/50 border-red-200';
    return 'text-gray-600 bg-gray-100/50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          {...cardAnimation}
          className="flex justify-between items-center p-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
              <div className="p-2 bg-neutral-100 rounded-lg">
                <Fuel className="w-6 h-6 text-neutral-600" />
              </div>
              <span
                className="bg-gradient-to-r from-neutral-600 to-neutral-700 bg-clip-text text-transparent"
              >
                Price Management Hub
              </span>
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveAllChanges}
            className="px-4 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white rounded-lg text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </motion.button>
        </motion.div>
  
        {/* Fuel Prices */}
        <motion.div
          {...cardAnimation}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {fuelProducts.map((product, index) => (
            <div
              key={product.name}
              className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <Droplet className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      {index === 0
                        ? "Premium"
                        : index === 1
                        ? "Regular"
                        : "Commercial"}
                    </p>
                  </div>
                </div>
                <span className="text-neutral-600 text-xl font-bold">R</span>
              </div>
              <div className="flex items-end gap-1.5 mb-4">
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => {
                    const newProducts = [...fuelProducts];
                    newProducts[index].price = Math.max(0, Number(e.target.value));
                    setFuelProducts(newProducts);
                  }}
                  className="text-2xl font-bold bg-transparent border-b-2 border-neutral-200 focus:border-neutral-600 w-24 pl-1"
                  step="0.01"
                  aria-label={`${product.name} price`}
                />
                <span className="text-sm text-neutral-600 mb-1">/liter</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`py-1 px-2 rounded-full text-xs border ${getPriceChangeStyle(
                    index === 1 ? "-2.3" : "1.5"
                  )}`}
                >
                  {index === 1 ? (
                    <TrendingDown className="w-4 h-4 inline-block mr-1 text-neutral-600" />
                  ) : (
                    <TrendingUp className="w-4 h-4 inline-block mr-1 text-neutral-600" />
                  )}
                  {index === 0
                    ? "+1.5"
                    : index === 1
                    ? "-2.3"
                    : "+0.8"}
                  %
                </span>
                <span className="text-xs text-neutral-500">weekly trend</span>
              </div>
            </div>
          ))}
        </motion.div>
  
        {/* Store Products */}
        <motion.div
          {...cardAnimation}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
        >
          <h2 className="text-lg font-semibold p-4 border-b flex items-center gap-3 bg-gradient-to-r from-neutral-50 to-neutral-100">
            <div className="p-2 bg-neutral-100 rounded-lg">
              <Package className="w-5 h-5 text-neutral-600" />
            </div>
            Retail Products Pricing
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="p-3 text-left text-neutral-600 font-medium">
                    Product
                  </th>
                  <th className="p-3 text-left text-neutral-600 font-medium">
                    Category
                  </th>
                  <th className="p-3 text-left text-neutral-600 font-medium">
                    Current Price
                  </th>
                  <th className="p-3 text-left text-neutral-600 font-medium">
                    New Price
                  </th>
                  <th className="p-3 text-left text-neutral-600 font-medium">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {storeProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="p-3 font-medium text-neutral-900">
                      {product.name}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-neutral-100 rounded-full text-xs text-neutral-900">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-600">
                      R{product.currentPrice.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={product.newPrice}
                          onChange={(e) => {
                            const newProducts = [...storeProducts];
                            const idx = newProducts.findIndex((p) => p.id === product.id);
                            newProducts[idx].newPrice = Math.max(0.01, Number(e.target.value));
                            setStoreProducts(newProducts);
                          }}
                          className="p-1.5 border border-neutral-200 rounded-md w-24 text-sm focus:ring-2 focus:ring-neutral-600"
                          step="0.01"
                          aria-label={`New price for ${product.name}`}
                        />
                        <span className="text-xs text-neutral-500">ZAR</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full border text-sm ${getPriceChangeStyle(
                          calculateChange(product.currentPrice, product.newPrice)
                        )}`}
                      >
                        {product.newPrice > product.currentPrice ? (
                          <TrendingUp className="w-4 h-4 mr-1 text-neutral-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1 text-neutral-600" />
                        )}
                        {calculateChange(product.currentPrice, product.newPrice)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
  
        {/* Garage Services */}
        <motion.div
          {...cardAnimation}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {garageServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <Wrench className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">
                      {service.name}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      {service.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    service.category === "Essential"
                      ? "bg-neutral-100 text-neutral-600"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {service.category}
                </span>
              </div>
              <div className="mt-4">
                <label className="text-xs text-neutral-600 block mb-2">
                  Service Price
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) => {
                      const newValue = Math.max(0.01, Number(e.target.value));
                      setGarageServices((prev: any) =>
                        prev.map((s: any) =>
                          s.id === service.id ? { ...s, price: newValue } : s
                        )
                      );
                    }}
                    className="p-1.5 border border-neutral-200 rounded-md w-24 text-sm focus:ring-2 focus:ring-neutral-600"
                    step="0.01"
                    aria-label={`Price for ${service.name}`}
                  />
                  <span className="text-xs text-neutral-600">
                    per {service.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
  
        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg"
              role="status"
            >
              <Save className="w-4 h-4 text-white" />
              All changes saved successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    );
  };
  

export default PriceManagement;