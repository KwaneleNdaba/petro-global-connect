"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Flame, 
  Droplet, 
  Truck, 
  ChevronDown, 
  Calendar,
  Zap
} from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface FuelType {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

interface DateRange {
  value: string;
  label: string;
  days: number;
}

interface SalesData {
  date: string;
  ULP95: number;
  ULP93: number;
  Diesel: number;
}

const FuelSalesDashboard = () => {
  const fuelTypes: FuelType[] = [
    { 
      value: 'ULP95', 
      label: 'ULP 95', 
      icon: <Flame className="w-4 h-4" />, 
      color: '#f97316',
      textColor: 'text-orange-500'
    },
    { 
      value: 'ULP93', 
      label: 'ULP 93', 
      icon: <Droplet className="w-4 h-4" />, 
      color: '#3b82f6',
      textColor: 'text-blue-500'
    },
    { 
      value: 'Diesel', 
      label: 'Diesel', 
      icon: <Truck className="w-4 h-4" />, 
      color: '#22c55e',
      textColor: 'text-green-500'
    }
  ];

  const dateRangeOptions: DateRange[] = [
    { value: '7days', label: 'Week', days: 7 },
    { value: '30days', label: 'Month', days: 30 },
    { value: '90days', label: 'Quarter', days: 90 }
  ];

  const salesData: SalesData[] | any = [
    { date: '2024-02-03', ULP95: 2500, ULP93: 1800, Diesel: 3200 },
    { date: '2024-02-04', ULP95: 2800, ULP93: 2000, Diesel: 3500 },
    { date: '2024-02-05', ULP95: 2300, ULP93: 1600, Diesel: 3100 },
    { date: '2024-02-06', ULP95: 2900, ULP93: 2100, Diesel: 3800 },
    { date: '2024-02-07', ULP95: 2600, ULP93: 1900, Diesel: 3300 },
    { date: '2024-02-08', ULP95: 2400, ULP93: 1700, Diesel: 3000 },
    { date: '2024-02-09', ULP95: 2700, ULP93: 2200, Diesel: 3600 }
  ];

  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7days');
  const [isFuelDropdownOpen, setIsFuelDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const chartOptions = useMemo<any>(() => ({
    chart: {
      type: 'line',
      height: 400,
      zoom: { enabled: false },
      toolbar: { show: true, tools: { download: false } }
    },
    colors: fuelTypes.map(f => f.color),
    stroke: { curve: 'smooth', width: 2 },
    markers: { size: 4 },
    xaxis: {
      categories: salesData.map((entry: any) => new Date(entry.date).toLocaleDateString('en-ZA')),
      labels: { style: { fontSize: '12px' } }
    },
    yaxis: {
      title: { text: 'Liters', style: { fontSize: '14px' } },
      labels: { style: { fontSize: '12px' } }
    },
    legend: {
      position: 'top',
      fontSize: '14px',
      markers: { radius: 8 }
    },
    grid: { 
      row: { colors: ['#f3f4f6', 'transparent'] },
      padding: { top: 0, right: 0, bottom: 0, left: 0 } 
    }
  }), [fuelTypes, salesData]);
  
  const chartSeries = useMemo(() => 
    fuelTypes.map(fuel => ({
      name: fuel.label,
      data: salesData.map((entry:any) => entry[fuel.value]),
    })), [fuelTypes, salesData]);

  const closeDropdowns = () => {
    setIsFuelDropdownOpen(false);
    setIsDateDropdownOpen(false);
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsFuelDropdownOpen(!isFuelDropdownOpen);
              setIsDateDropdownOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-neutral-600" />
              <span className="text-sm text-neutral-900">
                {selectedFuel === 'all' ? 'All Fuels' : fuelTypes.find(f => f.value === selectedFuel)?.label}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${
              isFuelDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {isFuelDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-md">
              <div 
                onClick={() => {
                  setSelectedFuel('all');
                  setIsFuelDropdownOpen(false);
                }}
                className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                All Fuels
              </div>
              {fuelTypes.map(fuel => (
                <div 
                  key={fuel.value}
                  onClick={() => {
                    setSelectedFuel(fuel.value);
                    setIsFuelDropdownOpen(false);
                  }}
                  className="px-3 py-2 flex items-center gap-2 text-sm hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <span className={fuel.textColor}>{fuel.icon}</span>
                  {fuel.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsDateDropdownOpen(!isDateDropdownOpen);
              setIsFuelDropdownOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-600" />
              <span className="text-sm text-neutral-900">
                {dateRangeOptions.find(r => r.value === dateRange)?.label}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${
              isDateDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {isDateDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-md">
              {dateRangeOptions.map(range => (
                <div 
                  key={range.value}
                  onClick={() => {
                    setDateRange(range.value);
                    setIsDateDropdownOpen(false);
                  }}
                  className="px-3 py-2 flex justify-between items-center text-sm hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <span>{range.label}</span>
                  <span className="text-neutral-600">{range.days}d</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {fuelTypes.map(fuel => (
          <div 
            key={fuel.value}
            className="bg-white p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-md ${fuel.textColor} bg-neutral-100 bg-opacity-20`}>
                {fuel.icon}
              </div>
              <h3 className="text-base font-medium text-neutral-900">{fuel.label}</h3>
            </div>
            <p className="text-3xl font-semibold text-neutral-900 mb-1">
              {salesData[salesData.length - 1][fuel.value].toLocaleString()}L
            </p>
            <p className="text-xs text-neutral-600 tracking-tight">Current Sales</p>
          </div>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-white p-4 rounded-lg border border-neutral-200">
        <h3 className="text-base font-medium text-neutral-900 mb-3">Sales Trends</h3>
        <div className="h-[400px]">
          <Chart
            options={chartOptions!}
            series={chartSeries}
            type="line"
            height="100%"
          />
        </div>
      </div>

      {(isFuelDropdownOpen || isDateDropdownOpen) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={closeDropdowns}
        />
      )}
    </div>
  );
};

export default FuelSalesDashboard;
