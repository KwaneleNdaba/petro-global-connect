import { ChevronLeft, ChevronRight } from 'lucide-react';
import FuelSalesDashboard from './FuelSalesDashboard';

const SalesOverview = () => {
    return (
        <div className="">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Sales Overview</h2>

            </div>
            <p className="text-gray-500 text-sm mb-6">
                Here is an overview of the sales amounts and fuel amounts for the selected period.
            </p>

            <FuelSalesDashboard />
        </div>
    );
};

export default SalesOverview;