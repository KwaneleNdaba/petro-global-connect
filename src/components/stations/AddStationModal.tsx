import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Select,
  ModalHeader,
  ModalBody,
  FileInput,
  Checkbox,
} from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IImageUrl, IStation } from '@/interfaces/station/station';
import Image from "next/image";
import { STATION_API } from '@/api/endpoints/rest-api/station/station';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import LoaderComponent from '../loader';
import { usePathname, useRouter } from 'next/navigation';

interface AddStationModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (station: IStation) => void;
  station?: IStation
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const FUEL_TYPES = ["Petrol 93", "Petrol 95", "Diesel", "Electric", "LPG"];
const FACILITIES = ["ATM", "Car Wash", "Convenience Store", "Restrooms", "Air Pump", "Vending Machines"];

const AddStationModal: React.FC<AddStationModalProps> = ({ show, onClose, onSave, station }) => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [operatingHours, setOperatingHours] = useState<string>('');
  const [assignedEmployees, setAssignedEmployees] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fuelTypesAvailable, setFuelTypesAvailable] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [lowOnStock, setLowOnStock] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<string>('active');
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleFuelTypeChange = (fuelType: string) => {
    setFuelTypesAvailable(prev =>
      prev.includes(fuelType)
        ? prev.filter(f => f !== fuelType)
        : [...prev, fuelType]
    );
  };

  const handleFacilityChange = (facility: string) => {
    setFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      let imageUrl: IImageUrl | undefined;

      // Upload image first if exists
      if (imageFile) {
        const formData = new FormData();
        formData.append('files', imageFile);

        const uploadResponse = await STATION_API.UPLOAD_IMAGE(formData);
        const uploadedImage = uploadResponse.data[0];
        imageUrl = {
          url: uploadedImage.url,
          publicId: uploadedImage.publicId
        };
      }

      const newStation: IStation = {
        name,
        location,
        address,
        phoneNumber,
        operatingHours,
        assignedEmployees: parseInt(assignedEmployees) || 0,
        lowOnStock,
        status,
        fuelTypesAvailable,
        facilities,
        imageUrl
      };

      const updatePayload = {
        ...newStation,
        id: station?.id ?? 0
      }



      const createResponse = await (station ? STATION_API.UPDATE_STATION(updatePayload) : STATION_API.CREATE_STATION(newStation))



      if (createResponse.error) {
        throw new Error(createResponse.message);
      }
      const date = new Date()
      router.replace(`${pathname}?refreshId=${date.getTime()}`)
      onSave(createResponse.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating station:', error);
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  };
  const resetForm = () => {
    setName('');
    setAddress('');
    setLocation('');
    setPhoneNumber('');
    setOperatingHours('');
    setAssignedEmployees('');
    setImageFile(null);
    setImagePreview('');
    setFuelTypesAvailable([]);
    setFacilities([]);
    setLowOnStock(false);
    setStatus('active');
  };

  useEffect(() => {
    // When station prop changes (for edit mode), populate the form
    if (station) {
      setName(station.name);
      setAddress(station.address);
      setLocation(station.location);
      setPhoneNumber(station.phoneNumber);
      setOperatingHours(station.operatingHours);
      setAssignedEmployees(station.assignedEmployees.toString());
      setFuelTypesAvailable(station.fuelTypesAvailable);
      setFacilities(station.facilities);
      setLowOnStock(station.lowOnStock);
      setStatus(station.status);

      if (station.imageUrl) {
        setImagePreview(station.imageUrl.url);
      }
    } else {
      resetForm();
    }
  }, [station]);

  return (
    <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Modal
          show={true}
          onClose={() => {
            onClose();
            resetForm();
          }}
          size="3xl"
          popup
          className="[&>div:first-child]:bg-black/20"
        >
          <ModalHeader className="border-b-0 pb-0" />
          <ModalBody className="pt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 p-4"
            >
              <motion.div variants={childVariants}>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {station ? 'Edit Fuel Station' : 'Create New Fuel Station'}
                </h3>
              </motion.div>

              <motion.div variants={childVariants}>
                <TextInput
                  id="station-name"
                  placeholder="Station Name (e.g., Shell Fuel Station)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg focus:ring-2 focus:ring-blue-400 border-gray-300"
                  required
                />
              </motion.div>

              <motion.div variants={childVariants} className="grid grid-cols-2 gap-4">
                <TextInput
                  id="station-location"
                  placeholder="Location (e.g., Cape Town)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
                <TextInput
                  id="station-address"
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </motion.div>

              <motion.div variants={childVariants} className="grid grid-cols-2 gap-4">
                <TextInput
                  id="station-phone"
                  placeholder="Phone Number (e.g., +27 21 123 4567)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <TextInput
                  id="station-hours"
                  placeholder="Operating Hours (e.g., Mon-Sun: 06:00 - 22:00)"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </motion.div>

              <motion.div variants={childVariants} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Station Image
                </label>
                <div className="flex items-center gap-4">
                  <FileInput
                    accept="image/*"
                    onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                    className="w-full rounded-lg"
                  />
                  {imagePreview && (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="relative h-24 w-24"
                    >
                      <Image
                        src={imagePreview}
                        alt="Station Preview"
                        className="rounded-lg border-2 border-gray-200 object-cover"
                        fill
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={childVariants} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Types Available
                  </label>
                  <div className="space-y-2">
                    {FUEL_TYPES.map(fuelType => (
                      <div key={fuelType} className="flex items-center">
                        <Checkbox
                          id={`fuel-${fuelType}`}
                          checked={fuelTypesAvailable.includes(fuelType)}
                          onChange={() => handleFuelTypeChange(fuelType)}
                          className="mr-2"
                        />
                        <label htmlFor={`fuel-${fuelType}`}>{fuelType}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facilities
                  </label>
                  <div className="space-y-2">
                    {FACILITIES.map(facility => (
                      <div key={facility} className="flex items-center">
                        <Checkbox
                          id={`facility-${facility}`}
                          checked={facilities.includes(facility)}
                          onChange={() => handleFacilityChange(facility)}
                          className="mr-2"
                        />
                        <label htmlFor={`facility-${facility}`}>{facility}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={childVariants} className="grid grid-cols-3 gap-4">

                <Select
                  id="station-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                  className="rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </motion.div>

              <motion.div
                variants={childVariants}
                className="flex justify-end gap-3 pt-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    color="light"
                    onClick={() => { resetForm(); onClose(); }}
                    className="px-6 py-2.5 rounded-lg"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSave}
                    disabled={!name || !location || !address}
                    style={
                      {
                        outline: "none"
                      }
                    }
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-neutral-600 to-neutral-700 text-white"
                  >
                    {
                      isLoading ? <LoaderComponent /> : station ? 'Update Station' : 'Create Station'
                    }
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </ModalBody>
          </Modal>
    </motion.div>
  )}
</AnimatePresence>
  );
};

export default AddStationModal;