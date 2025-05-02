import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Select,
  ModalHeader,
  ModalBody,
} from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus} from 'lucide-react';
import { EMPLOYEE_API } from '@/api/endpoints/rest-api/employee/employee';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoaderComponent from '@/components/loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { IEmployee } from '@/interfaces/employee/employee';

interface AddEmployeeModalProps {
  show: boolean;
  employee?: IEmployee;
  onClose: () => void;
  onSave: (employee: {
    fullName: string;
    email: string;
    phoneNumber: string;
    idNumber: string;
    role: string;
    gender:string;
  }) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  show,
  onClose,
  onSave,
  employee
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('Manager');
  const [gender, setGender] = useState<string>('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();


  // Initialize form when employee prop changes (for edit mode)
  useEffect(() => {
    if (employee) {
      setFullName(employee.fullName);
      setEmail(employee.email);
      setPhoneNumber(employee.phoneNumber.replace('+', ''));
      setIdNumber(employee.idNumber);
      setRole(employee.role);
      setGender(employee.gender);
    } else {
      resetForm();
    }
  }, [employee]);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const employeeData = {
        fullName,
        email,
        phoneNumber: "+" + phoneNumber,
        idNumber,
        role,
        gender,
        status: "active"
      };

      let response;
      if (employee) {
        response = await EMPLOYEE_API.UPDATE_EMPLOYEE({
          ...employeeData,
          id: employee.id
        });
      } else {
        response = await EMPLOYEE_API.ADD_EMPLOYEE(employeeData);
      }

      if (response.error) {
        throw new Error(response.message || 'Failed to save employee');
      }

      const date = new Date();
      router.replace(`${pathname}?refreshId=${date.getTime()}`);
      onSave({
        fullName,
        email,
        phoneNumber: "+" + phoneNumber,
        idNumber,
        role,
        gender,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setIdNumber('');
    setRole('Manager');
    setGender('male');
    setMessage("");
  };

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
              className="space-y-4 p-6"
            >
              <motion.div
                variants={childVariants}
                className="flex items-center gap-3 mb-4"
              >
                <div className="p-3 bg-neutral-100 rounded-xl">
                <UserPlus className="h-6 w-6 text-neutral-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {employee ? 'Edit Employee' : 'Add New Employee'}
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={childVariants}>
                  <TextInput
                    id="full-name"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <TextInput
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <PhoneInput
                    country={'za'}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    containerClass="w-full"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <TextInput
                    id="id-number"
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <Select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Attendant">Attendant</option>
                  </Select>
                </motion.div>

                <motion.div variants={childVariants}>
                  <Select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    required
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </motion.div>
              </div>

              <motion.div
                variants={childVariants}
                className="flex justify-end gap-3 pt-6 border-t border-neutral-200"
              >
                {message && (
                  <span className="text-red-500 bg-red-200 px-5 py-2.5 rounded-lg">
                    {message}
                  </span>
                )}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    color="light"
                    onClick={() => { resetForm(); onClose(); }}
                    className="px-6 py-2 text-neutral-700 hover:bg-neutral-100"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    onClick={handleSave}
                    disabled={!fullName || !email || !role || isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <LoaderComponent />
                    ) : employee ? (
                      'Update Employee'
                    ) : (
                      'Save Employee'
                    )}
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

export default AddEmployeeModal;