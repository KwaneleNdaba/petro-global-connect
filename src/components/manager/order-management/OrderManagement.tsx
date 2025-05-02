'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fuel, ShoppingCart, Plus, X, ArrowUpDown, Truck, Droplet, Package } from 'lucide-react';

interface Order {
  id: string;
  type?: string;
  product?: string;
  quantity: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
  supplier: string;
  price: number;
}

type OrderType = 'fuel' | 'product';

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const OrderManagement = () => {
  const [newOrderType, setNewOrderType] = useState<OrderType>('fuel');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({ status: 'Pending' });
  const [sortBy, setSortBy] = useState<'date' | 'id' | 'quantity'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const suppliers = {
    fuel: ['Shell Corp', 'BP Global', 'Total Energy'],
    product: ['Beverage Co', 'Snack Foods Ltd', 'Local Bakery']
  };

  const fuelTypes = ['Fuel 95', 'Fuel 93', 'Diesel'];
  const products = ['Coca-Cola (24x500ml)', 'Chips (Box of 30)', 'Bread Loaves'];

  const generateOrderId = (type: OrderType) => {
    const prefix = type === 'fuel' ? 'F' : 'S';
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `#${prefix}${random}`;
  };

  const addOrder = () => {
    const order: Order = {
      id: generateOrderId(newOrderType),
      status: newOrder.status || 'Pending',
      date: new Date().toISOString().split('T')[0],
      supplier: newOrder.supplier || '',
      quantity: Number(newOrder.quantity),
      price: Number(newOrder.price),
      // Add type/product based on order type
      ...(newOrderType === 'fuel' 
        ? { type: newOrder.type } 
        : { product: newOrder.product })
    } as Order;
  
    setOrders([order, ...orders]);
    setShowOrderForm(false);
    setNewOrder({ status: 'Pending' });
  };
  

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#F023',
      type: 'Fuel 95',
      quantity: 15000,
      status: 'Delivered',
      date: '2023-08-15',
      supplier: 'Shell Corp',
      price: 18.75
    },
    {
      id: '#S456',
      product: 'Coca-Cola (24x500ml)',
      quantity: 50,
      status: 'Shipped',
      date: '2023-08-14',
      supplier: 'Beverage Co',
      price: 12.99
    },
    {
      id: '#F789',
      type: 'Diesel',
      quantity: 20000,
      status: 'Pending',
      date: '2023-08-13',
      supplier: 'Total Energy',
      price: 16.4
    },
    {
      id: '#S101',
      product: 'Bread Loaves',
      quantity: 100,
      status: 'Delivered',
      date: '2023-08-12',
      supplier: 'Local Bakery',
      price: 2.5
    },
  ]);

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }
    return filtered.sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return a[sortBy] > b[sortBy] ? modifier : -modifier;
    });
  }, [orders, filterStatus, sortBy, sortDirection]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100/20 text-amber-500 border-amber-200';
      case 'Shipped': return 'bg-blue-100/20 text-blue-500 border-blue-200';
      case 'Delivered': return 'bg-green-100/20 text-green-500 border-green-200';
      default: return 'bg-gray-100/20 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <motion.div
          {...cardAnimation}
          className="flex justify-between items-center p-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
              <div className="p-2 bg-neutral-100 rounded-lg">
                <Fuel className="w-6 h-6 text-neutral-600" />
              </div>
              <span className="bg-gradient-to-r from-neutral-600 to-neutral-700 bg-clip-text text-transparent">
                Supply Chain Dashboard
              </span>
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOrderForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white rounded-lg text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus className="w-4 h-4" />
            New Order
          </motion.button>
        </motion.div>

        <motion.div
          {...cardAnimation}
          className="flex gap-2 flex-wrap bg-white p-3 rounded-xl shadow-sm border border-neutral-200"
        >
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-1.5 border border-neutral-200 rounded-md text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-1.5 border border-neutral-200 rounded-md text-sm bg-white"
          >
            <option value="date">Date</option>
            <option value="id">ID</option>
            <option value="quantity">Quantity</option>
          </select>

          <button
            onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 border border-neutral-200 rounded-md text-sm bg-white flex items-center gap-1"
          >
            <ArrowUpDown className="w-4 h-4 text-neutral-600" />
            {sortDirection.toUpperCase()}
          </button>
        </motion.div>

        <AnimatePresence>
          {showOrderForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 flex items-center justify-center p-4"
            >
              <motion.div
                {...cardAnimation}
                className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-neutral-900">New Order</h3>
                  <button onClick={() => setShowOrderForm(false)}>
                    <X className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <div className="space-y-3">
                <div className="flex gap-2">
  <button
    onClick={() => {
      setNewOrderType('fuel');
      setNewOrder(prev => ({ 
        ...prev, 
        product: undefined,
        type: fuelTypes[0] 
      }));
    }}
    className={`px-3 py-1 rounded-md text-sm ${
      newOrderType === 'fuel'
        ? 'bg-neutral-600 text-white'
        : 'bg-neutral-100 text-neutral-700'
    }`}
  >
    Fuel
  </button>
  <button
    onClick={() => {
      setNewOrderType('product');
      setNewOrder(prev => ({ 
        ...prev, 
        type: undefined,
        product: products[0] 
      }));
    }}
    className={`px-3 py-1 rounded-md text-sm ${
      newOrderType === 'product'
        ? 'bg-neutral-600 text-white'
        : 'bg-neutral-100 text-neutral-700'
    }`}
  >
    Product
  </button>
</div>

                  {newOrderType === 'fuel' ? (
                    <select
                      value={newOrder.type}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, type: e.target.value })
                      }
                      className="w-full p-1.5 border border-neutral-200 rounded-md text-sm"
                    >
                      {fuelTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={newOrder.product}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, product: e.target.value })
                      }
                      className="w-full p-1.5 border border-neutral-200 rounded-md text-sm"
                    >
                      {products.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  )}

                  <select
                    value={newOrder.supplier}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, supplier: e.target.value })
                    }
                    className="w-full p-1.5 border border-neutral-200 rounded-md text-sm"
                  >
                    <option>Select Supplier</option>
                    {suppliers[newOrderType].map((supplier) => (
                      <option key={supplier} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>

                  <select
                    value={newOrder.status}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, status: e.target.value as 'Pending' | 'Shipped' | 'Delivered' })
                    }
                    className="w-full p-1.5 border border-neutral-200 rounded-md text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newOrder.quantity || ''}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, quantity: e.target.valueAsNumber })
                    }
                    className="w-full p-1.5 border border-neutral-200 rounded-md text-sm"
                  />

                  <input
                    type="number"
                    placeholder="Price per unit"
                    value={newOrder.price || ''}
                    onChange={(e) => {
                      const price = e.target.valueAsNumber;
                      setNewOrder({
                        ...newOrder,
                        price,
                      });
                    }}
                    className="w-full p-1.5 border border-neutral-200 rounded-md text-sm"
                  />

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => setShowOrderForm(false)}
                      className="px-3 py-1 text-neutral-700 text-sm hover:bg-neutral-100 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addOrder}
                      className="px-3 py-1 bg-neutral-600 text-white text-sm rounded-md hover:bg-neutral-700"
                    >
                      Create Order
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          {...cardAnimation}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                <tr>
                  {[
                    "Order ID",
                    "Date",
                    "Product",
                    "Supplier",
                    "Qty",
                    "Price",
                    "Total",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-3 text-left text-neutral-600 font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="p-3 font-medium text-neutral-900 flex items-center gap-2">
                      {order.type ? (
                        <Droplet className="w-4 h-4 text-neutral-600" />
                      ) : (
                        <Package className="w-4 h-4 text-neutral-600" />
                      )}
                      {order.id}
                    </td>
                    <td className="p-3 text-neutral-600">{order.date}</td>
                    <td className="p-3">
  <div className="flex items-center gap-2">
    {newOrderType === 'fuel' ? order.type : order.product}
    {order.type ? (
      <span className="text-xs px-1.5 py-0.5 bg-neutral-100 text-neutral-900 rounded">
        Fuel
      </span>
    ) : (
      <span className="text-xs px-1.5 py-0.5 bg-neutral-100 text-neutral-900 rounded">
        Product
      </span>
    )}
  </div>
</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-neutral-400" />
                        {order.supplier}
                      </div>
                    </td>
                    <td className="p-3 font-medium text-neutral-700">
                      {order.quantity.toLocaleString()}
                    </td>
                    <td className="p-3 text-neutral-600">
                      R{order.price?.toFixed(2)}
                    </td>
                    <td className="p-3 font-medium text-neutral-900">
                      R
                      {(order.quantity * order.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as Order['status'];
                          setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                        }}
                        className={`${getStatusColor(order.status)} px-2.5 py-1 rounded-full border text-sm cursor-pointer`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-neutral-600 flex flex-col items-center">
              <ShoppingCart className="w-12 h-12 text-neutral-400 mb-4" />
              <p>No orders found matching your criteria</p>
              <p className="text-sm mt-1">
                Try adjusting your filters or create a new order
              </p>
            </div>
          )}
        </motion.div>
      </div>
      <button

        className="w-full mt-2 bg-neutral-600 hover:bg-neutral-700 py-2 text-white rounded-xl transition-colors font-semibold flex items-center justify-center gap-2"
      >
        <ArrowUpDown className="w-5 h-5 text-white" />
        Save Changes
      </button>
    </div>
  );
};

export default OrderManagement;