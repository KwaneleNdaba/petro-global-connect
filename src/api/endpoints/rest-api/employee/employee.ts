import { DELETE, GET, POST, PUT } from "@/api/lib/client";
import { IUserLogin } from "@/interfaces/auth/auth";
import { baseUrl } from "../../url";
import { IAssignedEmployee, IAssignedEmployeeResponse, IEmployee } from "@/interfaces/employee/employee";
import { CustomResponse } from "@/interfaces/response";

const EmployeebaseURL = `${baseUrl}/employees`;


export const EMPLOYEE_API = {
  ADD_EMPLOYEE : async(userData : IEmployee) => {
    try {
      const response = await POST(`${EmployeebaseURL}/createEmployee`,userData);
      return response
    } catch (error) {
      throw error;
    }
  },
  GET_EMPLOYEES : async() : Promise<CustomResponse<IEmployee[]>> => {
    try {
      const response = await GET(`${EmployeebaseURL}/getAllEmployees`);
      return response
    } catch (error) {
      throw error;
    }
  },
  DELETE_EMPLOYEE : async(employeeId:number) : Promise<CustomResponse<IEmployee[]>> => {
    try {
      const response = await DELETE(`${EmployeebaseURL}/deleteEmployee/${employeeId}`);
      return response
    } catch (error) {
      throw error;
    }
  },

  UPDATE_EMPLOYEE : async(employeeData : IEmployee) : Promise<CustomResponse<IEmployee[]>> => {
    try {
      const response = await PUT(`${EmployeebaseURL}/updateEmployee`,employeeData);
      return response
    } catch (error) {
      throw error;
    }
  },


};
