'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Fuel, Utensils, Wrench, Plus, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface FuelStock {
  id: string;
  type: string;
  quantity: number;
  lastUpdated: string;
  supplier: string;
}

interface CanteenStock {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
}

interface GarageItem {
  id: string;
  name: string;
  quantity: number;
  status: 'Available' | 'Limited Stock' | 'Out of Stock';
  category: string;
  lastMaintenance: string;
}

const StockManagement = () => {
  const [fuelStock, setFuelStock] = useState<FuelStock[]>([
    { id: '1', type: "Fuel 95", quantity: 5000, lastUpdated: "2023-05-15", supplier: "PetroCorp" },
    { id: '2', type: "Fuel 93", quantity: 4000, lastUpdated: "2023-05-14", supplier: "PetroCorp" },
    { id: '3', type: "Diesel", quantity: 2000, lastUpdated: "2023-05-10", supplier: "DieselCo" },
  ]);

  const [canteenStock, setCanteenStock] = useState<CanteenStock[]>([
    { id: '1', name: "Coca-Cola", quantity: 50, unit: "Bottles", category: "Beverages", expiryDate: "2023-12-01" },
    { id: '2', name: "Chips", quantity: 30, unit: "Packets", category: "Snacks", expiryDate: "2023-10-15" },
  ]);

  const [garageItems, setGarageItems] = useState<GarageItem[]>([
    { id: '1', name: "Car Jack", quantity: 5, status: "Available", category: "Tools", lastMaintenance: "2023-04-10" },
    { id: '2', name: "Spare Tires", quantity: 2, status: "Limited Stock", category: "Parts", lastMaintenance: "2023-03-15" },
  ]);

  const [newFuelItem, setNewFuelItem] = useState<Omit<FuelStock, 'id'>>({
    type: "",
    quantity: 0,
    lastUpdated: new Date().toISOString().split('T')[0],
    supplier: ""
  });

  const [newCanteenItem, setNewCanteenItem] = useState<Omit<CanteenStock, 'id'>>({
    name: "",
    quantity: 0,
    unit: "",
    category: "",
    expiryDate: new Date().toISOString().split('T')[0]
  });

  const [newGarageItem, setNewGarageItem] = useState<Omit<GarageItem, 'id'>>({
    name: "",
    quantity: 0,
    status: "Available",
    category: "",
    lastMaintenance: new Date().toISOString().split('T')[0]
  });

  const [currentPage, setCurrentPage] = useState({
    fuel: 1,
    canteen: 1,
    garage: 1
  });

  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState({
    fuel: "",
    canteen: "",
    garage: ""
  });

  const [filters, setFilters] = useState({
    fuel: { supplier: "" },
    canteen: { category: "" },
    garage: { category: "", status: "" }
  });

  const filterOptions = {
    fuelSuppliers: [...new Set(fuelStock.map(item => item.supplier))],
    canteenCategories: [...new Set(canteenStock.map(item => item.category))],
    garageCategories: [...new Set(garageItems.map(item => item.category))],
    garageStatuses: ["Available", "Limited Stock", "Out of Stock"]
  };

  const filteredFuelStock = useMemo(() => {
    return [...fuelStock].reverse().filter(item => 
      item.type.toLowerCase().includes(searchTerm.fuel.toLowerCase()) &&
      (filters.fuel.supplier === "" || item.supplier === filters.fuel.supplier)
    );
  }, [fuelStock, searchTerm.fuel, filters.fuel.supplier]);

  const filteredCanteenStock = useMemo(() => {
    return [...canteenStock].reverse().filter(item => 
      item.name.toLowerCase().includes(searchTerm.canteen.toLowerCase()) &&
      (filters.canteen.category === "" || item.category === filters.canteen.category)
    );
  }, [canteenStock, searchTerm.canteen, filters.canteen.category]);

  const filteredGarageItems = useMemo(() => {
    return [...garageItems].reverse().filter(item => 
      item.name.toLowerCase().includes(searchTerm.garage.toLowerCase()) &&
      (filters.garage.category === "" || item.category === filters.garage.category) &&
      (filters.garage.status === "" || item.status === filters.garage.status)
    );
  }, [garageItems, searchTerm.garage, filters.garage.category, filters.garage.status]);

  const paginatedFuelStock = useMemo(() => {
    const startIndex = (currentPage.fuel - 1) * itemsPerPage;
    return filteredFuelStock.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFuelStock, currentPage.fuel]);

  const paginatedCanteenStock = useMemo(() => {
    const startIndex = (currentPage.canteen - 1) * itemsPerPage;
    return filteredCanteenStock.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCanteenStock, currentPage.canteen]);

  const paginatedGarageItems = useMemo(() => {
    const startIndex = (currentPage.garage - 1) * itemsPerPage;
    return filteredGarageItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredGarageItems, currentPage.garage]);

  const getStockStatus = (quantity: number) => {
    if (quantity > 1000) return "text-green-400";
    if (quantity > 500) return "text-amber-400";
    return "text-red-400";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-400/10 text-green-400";
      case "Limited Stock": return "bg-amber-400/10 text-amber-400";
      case "Out of Stock": return "bg-red-400/10 text-red-400";
      default: return "";
    }
  };

  const addFuelStock = () => {
    if (!newFuelItem.type || !newFuelItem.quantity) return;
    const newItem = {
      ...newFuelItem,
      id: Date.now().toString(),
    };
    setFuelStock([newItem, ...fuelStock]);
    setNewFuelItem({
      type: "",
      quantity: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      supplier: ""
    });
  };

  const addCanteenStock = () => {
    if (!newCanteenItem.name || !newCanteenItem.quantity || !newCanteenItem.unit) return;
    const newItem = {
      ...newCanteenItem,
      id: Date.now().toString(),
    };
    setCanteenStock([newItem, ...canteenStock]);
    setNewCanteenItem({
      name: "",
      quantity: 0,
      unit: "",
      category: "",
      expiryDate: new Date().toISOString().split('T')[0]
    });
  };

  const addGarageItem = () => {
    if (!newGarageItem.name || !newGarageItem.quantity) return;
    const newItem = {
      ...newGarageItem,
      id: Date.now().toString(),
    };
    setGarageItems([newItem, ...garageItems]);
    setNewGarageItem({
      name: "",
      quantity: 0,
      status: "Available",
      category: "",
      lastMaintenance: new Date().toISOString().split('T')[0]
    });
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  const PaginationControls = ({ 
    currentPage, 
    totalItems, 
    onPageChange,
    type 
  }: {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    type: 'fuel' | 'canteen' | 'garage';
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-neutral-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'bg-neutral-100 text-neutral-400'
                : 'bg-neutral-200 hover:bg-neutral-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <span className="flex items-center px-3 text-neutral-900">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-neutral-100 text-neutral-400'
                : 'bg-neutral-200 hover:bg-neutral-300'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-neutral-600" />
              Station Inventory Management
            </h1>
            <p className="text-neutral-600 mt-1">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </motion.div>

        <motion.div {...cardAnimation} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Fuel className="w-5 h-5 text-neutral-600" />
              Fuel Inventory
            </h3>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search fuel..."
                  value={searchTerm.fuel}
                  onChange={(e) => setSearchTerm({ ...searchTerm, fuel: e.target.value })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-neutral-600 text-neutral-700 w-full"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <select
                  value={filters.fuel.supplier}
                  onChange={(e) => setFilters({ ...filters, fuel: { ...filters.fuel, supplier: e.target.value } })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-neutral-600 text-neutral-700 appearance-none w-full"
                >
                  <option value="">All Suppliers</option>
                  {filterOptions.fuelSuppliers.map((supplier) => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  {["Fuel Type", "Quantity (L)", "Supplier", "Last Updated"].map((th) => (
                    <th key={th} className="px-4 py-3 text-left text-sm text-neutral-600">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {paginatedFuelStock.map((stock) => (
                  <tr key={stock.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 text-neutral-700">{stock.type}</td>
                    <td className={`px-4 py-3 font-medium ${getStockStatus(stock.quantity)}`}>
                      {stock.quantity.toLocaleString()} L
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{stock.supplier}</td>
                    <td className="px-4 py-3 text-neutral-600">{stock.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationControls
            currentPage={currentPage.fuel}
            totalItems={filteredFuelStock.length}
            onPageChange={(page) => setCurrentPage({ ...currentPage, fuel: page })}
            type="fuel"
          />

          <div className="mt-6 space-y-4">
            <h4 className="font-medium text-neutral-700">Add New Fuel Stock</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={newFuelItem.type}
                onChange={(e) => setNewFuelItem({ ...newFuelItem, type: e.target.value })}
                placeholder="Fuel Type"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="number"
                value={newFuelItem.quantity || ""}
                onChange={(e) => setNewFuelItem({ ...newFuelItem, quantity: Number(e.target.value) })}
                placeholder="Quantity (Liters)"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="text"
                value={newFuelItem.supplier}
                onChange={(e) => setNewFuelItem({ ...newFuelItem, supplier: e.target.value })}
                placeholder="Supplier"
                className="p-2 border rounded-md"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addFuelStock}
              className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-md transition-colors flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              Add Fuel Stock
            </motion.button>
          </div>
        </motion.div>

        <motion.div {...cardAnimation} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-neutral-600" />
              Canteen Inventory
            </h3>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm.canteen}
                  onChange={(e) => setSearchTerm({ ...searchTerm, canteen: e.target.value })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 text-neutral-700 w-full"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <select
                  value={filters.canteen.category}
                  onChange={(e) => setFilters({ ...filters, canteen: { ...filters.canteen, category: e.target.value } })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2bg-neutral-600 hover:bg-neutral-700 text-white appearance-none w-full"
                >
                  <option value="">All Categories</option>
                  {filterOptions.canteenCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  {["Product", "Quantity", "Unit", "Category", "Expiry Date"].map((th) => (
                    <th key={th} className="px-4 py-3 text-left text-sm text-neutral-600">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {paginatedCanteenStock.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 text-neutral-700">{product.name}</td>
                    <td className={`px-4 py-3 font-medium ${getStockStatus(product.quantity)}`}>
                      {product.quantity.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{product.unit}</td>
                    <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                    <td className="px-4 py-3 text-neutral-600">{product.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationControls
            currentPage={currentPage.canteen}
            totalItems={filteredCanteenStock.length}
            onPageChange={(page) => setCurrentPage({ ...currentPage, canteen: page })}
            type="canteen"
          />

          <div className="mt-6 space-y-4">
            <h4 className="font-medium text-neutral-700">Add New Canteen Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newCanteenItem.name}
                onChange={(e) => setNewCanteenItem({ ...newCanteenItem, name: e.target.value })}
                placeholder="Product Name"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="number"
                value={newCanteenItem.quantity || ""}
                onChange={(e) => setNewCanteenItem({ ...newCanteenItem, quantity: Number(e.target.value) })}
                placeholder="Quantity"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="text"
                value={newCanteenItem.unit}
                onChange={(e) => setNewCanteenItem({ ...newCanteenItem, unit: e.target.value })}
                placeholder="Unit (e.g., Bottles)"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="text"
                value={newCanteenItem.category}
                onChange={(e) => setNewCanteenItem({ ...newCanteenItem, category: e.target.value })}
                placeholder="Category"
                className="p-2 border rounded-md"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addCanteenStock}
              className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-md transition-colors flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              Add Canteen Item
            </motion.button>
          </div>
        </motion.div>

        <motion.div {...cardAnimation} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-neutral-600" />
              Garage Inventory
            </h3>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm.garage}
                  onChange={(e) => setSearchTerm({ ...searchTerm, garage: e.target.value })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 text-neutral-700 w-full"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <select
                  value={filters.garage.category}
                  onChange={(e) => setFilters({ ...filters, garage: { ...filters.garage, category: e.target.value } })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 text-neutral-700 appearance-none w-full"
                >
                  <option value="">All Categories</option>
                  {filterOptions.garageCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <select
                  value={filters.garage.status}
                  onChange={(e) => setFilters({ ...filters, garage: { ...filters.garage, status: e.target.value as any } })}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 text-neutral-700 appearance-none w-full"
                >
                  <option value="">All Statuses</option>
                  {filterOptions.garageStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  {["Item", "Quantity", "Category", "Status", "Last Maintenance"].map((th) => (
                    <th key={th} className="px-4 py-3 text-left text-sm text-neutral-600">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {paginatedGarageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 text-neutral-700">{item.name}</td>
                    <td className="px-4 py-3 font-medium text-neutral-700">
                      {item.quantity.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{item.category}</td>
                    <td className="px-4 py-3">
                      <span className={`${getStatusBadge(item.status)} px-3 py-1 rounded-full text-sm`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{item.lastMaintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationControls
            currentPage={currentPage.garage}
            totalItems={filteredGarageItems.length}
            onPageChange={(page) => setCurrentPage({ ...currentPage, garage: page })}
            type="garage"
          />

          <div className="mt-6 space-y-4">
            <h4 className="font-medium text-neutral-700">Add New Garage Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newGarageItem.name}
                onChange={(e) => setNewGarageItem({ ...newGarageItem, name: e.target.value })}
                placeholder="Item Name"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="number"
                value={newGarageItem.quantity || ""}
                onChange={(e) => setNewGarageItem({ ...newGarageItem, quantity: Number(e.target.value) })}
                placeholder="Quantity"
                className="p-2 border rounded-md"
                required
              />
              <select
                value={newGarageItem.status}
                onChange={(e) => setNewGarageItem({ ...newGarageItem, status: e.target.value as any })}
                className="p-2 border rounded-md"
              >
                <option value="Available">Available</option>
                <option value="Limited Stock">Limited Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <input
                type="text"
                value={newGarageItem.category}
                onChange={(e) => setNewGarageItem({ ...newGarageItem, category: e.target.value })}
                placeholder="Category"
                className="p-2 border rounded-md"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addGarageItem}
              className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-md transition-colors flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              Add Garage Item
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StockManagement;