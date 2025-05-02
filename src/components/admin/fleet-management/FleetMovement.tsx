"use client";

import { motion } from "framer-motion";
import { Truck, Fuel, Gauge } from "lucide-react";

interface FleetMovement {
  vehicleId: string;
  driver: string;
  startLocation: string;
  destination: string;
  fuelUsage: number;
  status: "In Transit" | "Refueling" | "At Rest";
}

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export default function FleetMovement() {
  const fleetMovements: FleetMovement[] = [
    { vehicleId: "TR-045", driver: "John Doe", startLocation: "Depot A", destination: "Station B", fuelUsage: 120, status: "In Transit" },
    { vehicleId: "TR-078", driver: "Jane Smith", startLocation: "Station C", destination: "Depot A", fuelUsage: 95, status: "Refueling" },
    { vehicleId: "TR-112", driver: "Mike Ross", startLocation: "Station B", destination: "Station C", fuelUsage: 80, status: "At Rest" },
  ];

  const statusClass = (status: FleetMovement["status"]) => {
    switch (status) {
      case "In Transit":
        return "text-green-600 bg-green-50 border-green-100";
      case "Refueling":
        return "text-yellow-600 bg-yellow-50 border-yellow-100";
      default:
        return "text-neutral-600 bg-neutral-50 border-neutral-100";
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Fleet Movement</h1>
        <p className="text-neutral-600 mb-6">
          Track real-time movements of your fleet, fuel usage, and operational status.
        </p>
      </motion.div>

      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          {...cardAnimation}
          className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-800">Total Vehicles</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">45</p>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-800">Distance Covered (KM)</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">3,256</p>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Fuel className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-800">Fuel Consumption (L)</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">1,245</p>
        </motion.div>
      </div>

      {/* Fleet Movement Table */}
      <motion.div
        {...cardAnimation}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
              <tr>
                <th className="p-3 text-left text-neutral-600 font-semibold">Vehicle ID</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Driver</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Start Location</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Destination</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Fuel Usage (L)</th>
                <th className="p-3 text-left text-neutral-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {fleetMovements.map((move, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="p-3 text-neutral-900">{move.vehicleId}</td>
                  <td className="p-3 text-neutral-900">{move.driver}</td>
                  <td className="p-3 text-neutral-600">{move.startLocation}</td>
                  <td className="p-3 text-neutral-600">{move.destination}</td>
                  <td className="p-3 text-neutral-600">{move.fuelUsage}</td>
                  <td className="p-3">
                    <span className={`${statusClass(move.status)} px-2.5 py-1 rounded-full border text-xs font-medium inline-flex items-center gap-1.5`}>
                      {move.status === "In Transit" && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                      {move.status === "Refueling" && (
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      )}
                      {move.status === "At Rest" && (
                        <span className="w-2 h-2 bg-neutral-400 rounded-full"></span>
                      )}
                      {move.status}
                    </span>
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