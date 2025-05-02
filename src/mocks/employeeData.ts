import { IEmployee, IAssignedEmployeeResponse } from "@/interfaces/employee/employee";

export const mockEmployees: IEmployee[] = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    idNumber: "ID123456",
    role: "Manager",
    gender: "male",
    status: "active"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    idNumber: "ID789012",
    role: "Cashier",
    gender: "female",
    status: "active"
  },
  {
    id: 3,
    fullName: "Robert Johnson",
    email: "robert.j@example.com",
    phoneNumber: "+1122334455",
    idNumber: "ID345678",
    role: "Technician",
    gender: "male",
    status: "inactive"
  },
  {
    id: 4,
    fullName: "Emily Davis",
    email: "emily.d@example.com",
    phoneNumber: "+1555666777",
    idNumber: "ID901234",
    role: "Supervisor",
    gender: "female",
    status: "active"
  },
  {
    id: 5,
    fullName: "Michael Brown",
    email: "michael.b@example.com",
    phoneNumber: "+1444333222",
    idNumber: "ID567890",
    role: "Security",
    gender: "male",
    status: "active"
  }
];

export const mockAssignedEmployees: IAssignedEmployeeResponse[] = [
  {
    id: 1,
    employeeId: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    idNumber: "ID123456",
    role: "Manager",
    gender: "male",
    stationId: 1,
    stationName: "Downtown Station"
  },
  {
    id: 2,
    employeeId: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    idNumber: "ID789012",
    role: "Cashier",
    gender: "female",
    stationId: 1,
    stationName: "Downtown Station"
  },
  {
    id: 3,
    employeeId: 4,
    fullName: "Emily Davis",
    email: "emily.d@example.com",
    phoneNumber: "+1555666777",
    idNumber: "ID901234",
    role: "Supervisor",
    gender: "female",
    stationId: 1,
    stationName: "Downtown Station"
  }
]; 