"use client";
import { IStation } from '@/interfaces/station/station';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddStationModal from './AddStationModal';
import { STATION_API } from '@/api/endpoints/rest-api/station/station';
import StationCard from './StationCard';
import { StationCardSkeleton } from '../skeleton/station/StationCardSkeleton';
import { EmptyStationsState } from './EmptyStationsState';



const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const StationsGrid = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const [stations, setStations] = useState<IStation[]>([]);

  const selectStation = (station: IStation) => {
    localStorage.setItem("station", JSON.stringify(station));
    router.push("/manager/dashboard")
  };


  const getAllStations = async () => {
    try {
      setLoading(true)
      const getStations = await STATION_API.GET_ALL_STATIONS();
      setStations(getStations.data ?? [])
      setLoading(false);
    } catch (error) {
      setLoading(false)
      throw error;
    }
  }

  useEffect(() => {
    getAllStations();
  }, [refreshId])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center flex justify-center">
          {pathname !== "/super/stations" ? (
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Select Your Station
              </h1>
              <p className="text-gray-600">
                Choose from the list of available fuel stations below. View real-time
                stock levels, sales data, and current status of each station.
              </p>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center max-w-6xl mx-auto px-4">
              <h1 className="text-3xl font-bold text-gray-900">Stations</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow(true)}
                className="cursor-pointer px-4 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white rounded-lg text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Plus className="w-4 h-4" />
                Create Station
              </motion.button>
            </div>
          )}
        </div>


        {/* Stations Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {!loading && stations.map((station) => (
            <motion.div
              key={station.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3 }}
              // onClick={() => selectStation(station)}
            >
              <StationCard station={station} />
            </motion.div>
          ))}

          {loading && Array.from({ length: 4 }).map((_, index) => (
            <StationCardSkeleton key={index} />
          ))}
          
       </div>
        {(!loading && stations.length === 0 )&& <EmptyStationsState/>}
      </div>
      <AddStationModal
        show={show}
        onClose={() => setShow(false)}
        onSave={() => { }}
      />
    </div>
  );
};

export default StationsGrid;