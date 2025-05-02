"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, User, UserMinus, UserPlus } from "lucide-react";
import { IdentificationIcon } from "@heroicons/react/16/solid";
import AddEmployeeModal from "./AddEmployeeModal";
import { IAssignedEmployee, IAssignedEmployeeResponse, IEmployee } from "@/interfaces/employee/employee";
import { EMPLOYEE_API } from "@/api/endpoints/rest-api/employee/employee";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { AssignmentConfirmationModal } from "./ConfirmAssignmemnt";
import { EMPLOYEE_ASSIGNMENTS_API } from "@/api/endpoints/rest-api/employee-assignments/assignments";
import { mockEmployees, mockAssignedEmployees } from "@/mocks/employeeData";

const rowAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export default function EmployeesTable() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [employeeId, setEmployeeId] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedEmployee, setSelectedEmployee] = useState<any>()
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [assignedEmployees, setAssignedEmployees] = useState<IAssignedEmployeeResponse[]>([])
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showAssigned, setShowAssigned] = useState(true);
  const station_name = searchParams.get("station-name") ?? "";
  const { id } = useParams<{
    id: string;
  }>()

  const headers = showAssigned ? [
    'Full Name',
    'Email',
    'Phone',
    'ID Number',
    'Role',
    'Gender',
    'Actions'
  ] : [
    'Full Name',
    'Email',
    'Phone',
    'ID Number',
    'Role',
    'Gender',
    'Status',
    'Actions'
  ];
  
  const fetchEmployees = async () => {
    // Mock data instead of API call
    setEmployees(mockEmployees);
  };

  useEffect(() => {
    if (pathname === "/super/employees") {
      fetchEmployees();
    }
  }, [refreshId, pathname]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const deleteEmployee = async () => {
    try {
      await EMPLOYEE_API.DELETE_EMPLOYEE(employeeId)
      const date = new Date();
      router.replace(`${pathname}?refreshId=${date.getTime()}`)
    } catch (error) {
      console.error(error);
    }
  }

  const assignEmplyee = async () => {
    const data: IAssignedEmployee = {
      fullName: selectedEmployee?.fullName ?? "",
      email: selectedEmployee?.email ?? "",
      phoneNumber: selectedEmployee?.phoneNumber ?? "",
      idNumber: selectedEmployee?.idNumber ?? "",
      role: selectedEmployee?.role ?? "",
      gender: selectedEmployee?.gender ?? "",
      stationId: Number(id)!,
      employeeId: Number(selectedEmployee?.id)
    }
    try {
      await EMPLOYEE_ASSIGNMENTS_API.ASSIGN_EMPLOYEE(data);
      const date = new Date();
      router.replace(`${pathname}?refreshId=${date.getTime()}`)
    } catch (error) {
      console.error(error);
    }
  }

  const UnAssignEmplyee = async () => {
 
    try {
      const data = {
        stationId:Number(id),
        employeeId:Number(selectedEmployee?.employeeId)
      }
      await EMPLOYEE_ASSIGNMENTS_API.UNASSIGN_EMPLOYEE(data);
      const date = new Date();
      router.replace(`${pathname}?refreshId=${date.getTime()}`)
    } catch (error) {
      console.error(error);
    }
  }

  const getAssignedEmployees = async () => {
    // Mock data instead of API call
    setAssignedEmployees(mockAssignedEmployees);
  };

  const getUnAssignedEmployees = async () => {
    // Mock data instead of API call
    setEmployees(mockEmployees.filter(emp => 
      !mockAssignedEmployees.some(assigned => assigned.employeeId === emp.id)
    ));
  };

  useEffect(() => {
    if (pathname === `/super/stations/${id}`) {
      if (showAssigned) {
        getAssignedEmployees();
      } else {
        getUnAssignedEmployees();
      }
      setShowAssignmentModal(false);
    }
  }, [refreshId, showAssigned, pathname])

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-start mt-3"
      >
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
            <div className="p-3 bg-neutral-100 rounded-xl">
              <IdentificationIcon className="h-8 w-8 text-neutral-600" />
            </div>
            {
              pathname === `/super/stations/${id}` ? "Station" : pathname === "/super/employees" ? (showAssigned ? "Assigned Employees" : "All Employees") : "Employee"
            } Management
          </h2>
          <p className="text-neutral-600 mb-2">
            Overview of all employees in the system
          </p>
        </div>
        {pathname !== `/super/stations/${id}` && <button
          onClick={() => setShow(true)}
          className="cursor-pointer px-4 py-2 mt-4 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white rounded-lg text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          Add Employees
        </button>}

      </motion.div>

      {
        pathname === `/super/stations/${id}` && <div className="flex flex-row justify-end py-2  mb-3 bg-white rounded-lg shadow-sm">
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => setShowAssigned(true)}
              className={`px-4 py-2 cursor-pointer rounded-lg ${showAssigned
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              Assigned Employees
            </button>
            <button
              onClick={() => setShowAssigned(false)}
              className={`px-4 py-2 cursor-pointer rounded-lg ${!showAssigned
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              All Employees
            </button>
          </div>
        </div>

      }
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Employees</h1>
          <p className="text-neutral-600 mb-6">
            This is a list of all employees with their details and current status.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="p-3 text-left text-neutral-600 font-semibold whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200">
                {(pathname === "/super/employees" ? employees : (showAssigned ? assignedEmployees : employees)).map((employee, index) => (
                  <motion.tr
                    key={index}
                    variants={rowAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="p-3 text-neutral-900 font-medium whitespace-nowrap">
                      {employee.fullName}
                    </td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap">{employee.email}</td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap">{employee.phoneNumber}</td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap">{employee.idNumber}</td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap">{employee.role}</td>
                    <td className="p-3 text-neutral-600 whitespace-nowrap capitalize">
                      {employee.gender}
                    </td>
                 {
                  !showAssigned && pathname !== "/super/employees" && <td className="p-3 whitespace-nowrap">
                  <span className={getStatusBadge(employee.status!)}>
                    {employee.status}
                  </span>
                </td> 
                 }

                    {
                      pathname === `/super/stations/${id}` ? <td className="p-3 flex justify-center items-center gap-2 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          {/* Assign Button */}
                       {
                        !showAssigned ? <button
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setShowAssignmentModal(true);
                        }}
                        className="p-2 rounded-full bg-blue-100 cursor-pointer text-blue-600 hover:bg-blue-200 transition"
                        title="Assign"
                      >
                        <p className="flex space-x-2"><UserPlus className="w-4 h-4 text-blue-600" /></p>
                      </button> :   <button
                            onClick={() => {
                            setSelectedEmployee(employee)
                              setShowAssignmentModal(true);
                            }}
                            className="p-2 rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition"
                            title="Remove"
                          >
                            <UserMinus className="w-4 h-4 text-red-600" /> 
                          </button>
                       }

                         
                        </div>
                      </td> : <td className="p-3 flex items-center gap-2 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => {
                            setSelectedEmployee(employee);
                            setShow(true);
                          }} className="p-2 rounded-full bg-green-100  cursor-pointer hover:bg-green-200 transition">
                            <Pencil className="w-4 h-4 text-green-600" />
                          </button>
                          <button onClick={() => {
                            setEmployeeId(employee.id!);
                            setOpenConfirmationModal(true)
                          }} className="p-2 rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    }

                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(pathname === "/super/employees" ? employees : (showAssigned ? assignedEmployees : employees)).length === 0 && (
            <div className="p-8 text-center text-neutral-600 flex flex-col items-center">
              <User className="w-12 h-12 text-neutral-400 mb-4" />
              <p>No employees found</p>
              <p className="text-sm mt-1">
                Try adding new employees to the system
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <AddEmployeeModal
        show={show}
        onClose={() => setShow(false)}
        onSave={() => { }}
        employee={selectedEmployee}
      />
      <ConfirmationModal
        show={openConfirmationModal}
        isLoading={false}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={deleteEmployee}
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete Employee"
        confirmColor="warning"
      />
      <AssignmentConfirmationModal

        show={showAssignmentModal}
        onClose={() => {
          setShowAssignmentModal(false)
        }}
        onConfirm={showAssigned ? UnAssignEmplyee : assignEmplyee}
        name={selectedEmployee?.fullName ?? ""}
        station={station_name!}
        isAssigning={showAssigned}
      />
    </div>
  );
}