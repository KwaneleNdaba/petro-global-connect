export interface IEmployee {
    id?: number; 
    fullName: string;
    email: string;
    phoneNumber: string;
    idNumber: string;
    role: string;
    gender: string;
    status?:string;
    assigned?:boolean;
    NumberOfStations?:number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IAssignedEmployee {
    fullName: string;
    email: string;
    phoneNumber: string;
    idNumber: string;
    role: string; 
    gender: string;
    stationId: number;
    employeeId: number;
  }
  
  export interface IAssignedEmployeeResponse {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    idNumber: string;
    role: string; 
    gender: string;
    stationId: number;
    employeeId: number;
    status?:string;
    assigned?:boolean;
    NumberOfStations?:number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  export interface IUnAssignedEmployee {
        stationId: number;
    employeeId: number;
  }