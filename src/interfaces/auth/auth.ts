export interface DataStoreInToken {
    _id : string;
    email : string
}

export interface TokenData {

    accessToken : string;
    refreshToken : string;
    expiresAt : Date
}

export interface IAuth {
    email :string;
    password:string
}

export interface IDecodedJWT {
    id: string;
    email: string;
    fullName:string;
    role:string;
    phoneNumber?:string;
    position?:string;
    employeeId:string;
    exp: number; 
    iat: number;
  }

export interface IUser {
    id?: string;
    email: string;
    password?:string;
    employeeId?:number;
    fullName:string;
    role:string;
    phoneNumber?:string;
    position?: string
}



  export type IUserLogin = {
    email: string;
    password: string
  }