'use client';

import Image from 'next/image';
import { IStation } from '@/interfaces/station/station';
import { Pencil, Trash2 } from 'lucide-react';
import { STATION_API } from '@/api/endpoints/rest-api/station/station';
import { useState } from 'react';
import { ConfirmationModal } from '../ConfirmationModal';
import { usePathname, useRouter } from 'next/navigation';
import AddStationModal from './AddStationModal';
import Cookies from 'universal-cookie';

type StationCardProps = {
  station: IStation;
};

export default function StationCard({ station }: StationCardProps) {

  const [stationId, setStationId] = useState<number>(0);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const cookies = new Cookies();
  const user = cookies.get("userCredentials");
  const [selectedStation, setSelectedStation] = useState<IStation>();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const deleteStation = async () => {
    try {
      await STATION_API.DELETE_STATION(stationId);
      const date = new Date();
      // router.replace(`${pathname}?refreshId=${date.getTime()}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRoute = (station: IStation) => {
    if (user?.role === "SuperAdmin") {
      router.push(`/super/stations/${station.id}?station-name=${station?.name}`);
    } else if (user?.role === "Admin") {
      router.push(`/admin/dashboard`);
    } else if (user?.role === "Manager") {
      router.push(`/manager/dashboard`);
    }
  }

  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent handleRoute from running if the click is on the buttons
    if ((event.target as HTMLElement).closest('button')) return;
    handleRoute(station);
  };

  return (
    <div
      className="bg-surface text-text-primary shadow-lg rounded-xl p-5 hover:scale-105 transition-transform cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Station Image */}
      <div className="h-40 justify-center flex w-full mb-3">
        {station.imageUrl ? (
          <Image
            src={station.imageUrl.url!}
            alt={station.name}
            width={200}
            height={160}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Station Name and Location */}
      <h2 className="text-lg font-semibold truncate">{station.name}</h2>
      <p className="text-gray-400 truncate">{station.location}</p>

      {/* Fuel Types (showing first 2 types) */}
      <div className="mt-3">
        <p className="text-gray-500 text-sm">Fuel Types:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {station.fuelTypesAvailable.slice(0, 2).map((type) => (
            <span key={type} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {type}
            </span>
          ))}
          {station.fuelTypesAvailable.length > 2 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              +{station.fuelTypesAvailable.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Facilities (showing first 2) */}
      <div className="mt-2">
        <p className="text-gray-500 text-sm">Facilities:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {station.facilities.slice(0, 2).map((facility) => (
            <span key={facility} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {facility}
            </span>
          ))}
          {station.facilities.length > 2 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              +{station.facilities.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Status and Employees */}
      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Employees</p>
          <p className="text-text-secondary font-semibold">
            {station.assignedEmployees}
          </p>
        </div>
        <div>
          <span
            className={`text-white py-1 px-3 rounded-full text-sm ${station.status === 'active' ? 'bg-green-500' :
              station.lowOnStock ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
          >
            {station.status === 'active'
              ? station.lowOnStock ? 'Low Stock' : 'Active'
              : 'Inactive'}
          </span>
        </div>
      </div>
      {
        pathname.startsWith("/super") && <div className="flex items-center justify-end space-x-2">
          <button onClick={() => {
            setShow(true);
            setSelectedStation(station)
          }} className="p-2 rounded-full bg-green-100  cursor-pointer hover:bg-green-200 transition">
            <Pencil className="w-4 h-4 text-green-600" />
          </button>
          <button onClick={() => {
            setStationId(station.id!);
            setOpenConfirmationModal(true)

          }} className="p-2 rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      }
      <ConfirmationModal
        show={openConfirmationModal}
        isLoading={false}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={deleteStation}
        message="Are you sure you want to delete this station? This action cannot be undone."
        confirmText="Delete Station"
        confirmColor="warning"
      />
      <AddStationModal
        show={show}
        onClose={() => setShow(false)}
        onSave={() => { }}
        station={selectedStation}
      />
    </div>
  );
}