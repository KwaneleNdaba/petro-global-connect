import { DELETE, GET, POST, PUT } from "@/api/lib/client";
import { IUserLogin } from "@/interfaces/auth/auth";
import { baseUrl } from "../../url";
import { IAssignedEmployee, IAssignedEmployeeResponse, IEmployee, IUnAssignedEmployee } from "@/interfaces/employee/employee";
import { CustomResponse } from "@/interfaces/response";

const Employee_Assignment_BaseURL = `${baseUrl}/assignments`;


export const EMPLOYEE_ASSIGNMENTS_API = {
  ASSIGN_EMPLOYEE : async(employeeData : IAssignedEmployee) : Promise<CustomResponse<IAssignedEmployeeResponse>> => {
    try {
      const response = await POST(`${Employee_Assignment_BaseURL}/assign`,employeeData);
      return response
    } catch (error) {
      throw error;
    }
  },

  UNASSIGN_EMPLOYEE : async(employeeData : IUnAssignedEmployee) : Promise<CustomResponse<null>> => {
    try {
      const response = await POST(`${Employee_Assignment_BaseURL}/unassign`,employeeData);
      return response
    } catch (error) {
      throw error;
    }
  },

  GET_UNASSIGN_EMPLOYEES : async(stationId : string) : Promise<CustomResponse<IEmployee[]>> => {
    try {
      const response = await GET(`${Employee_Assignment_BaseURL}/getUnassignedEmployeesByStationId/${stationId}`);
      return response
    } catch (error) {
      throw error;
    }
  }
  ,
  GET_ASSIGNED_EMPLOYEES : async(stationId : string) : Promise<CustomResponse<IAssignedEmployeeResponse[]>> => {
    try {
      const response = await GET(`${Employee_Assignment_BaseURL}/getAssignedEmployeed/${stationId}`);
      return response
    } catch (error) {
      throw error;
    }
  }
  
  

};
