import { POST } from "@/api/lib/client";
import { IUserLogin } from "@/interfaces/auth/auth";
import { baseUrl } from "../../url";

const AuthbaseURL = `${baseUrl}/auth`;


export const AUTH_API = {
  LOGIN_POST : async(userData : IUserLogin) => {
    try {
      const response = await POST(`${AuthbaseURL}/login`,userData);
      return response
    } catch (error) {
      throw error;
    }
  },
 
};
