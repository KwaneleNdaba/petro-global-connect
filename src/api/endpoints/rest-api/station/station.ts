import { DELETE, GET, POST, PUT } from "@/api/lib/client";
import { IUserLogin } from "@/interfaces/auth/auth";
import { baseUrl } from "../../url";
import { IStation } from "@/interfaces/station/station";
import { POSTFILES } from "../../../lib/client";
import { CustomResponse } from "@/interfaces/response";

const StationBaseURL = `${baseUrl}/stations`;


export const STATION_API = {
  CREATE_STATION : async(stationData : IStation) => {
    try {
      const response = await POST(`${StationBaseURL}/addStation`,stationData);
      return response
    } catch (error) {
      throw error;
    }
  },
  UPDATE_STATION : async(stationData : IStation) => {
    try {
      const response = await PUT(`${StationBaseURL}/updateStation`,stationData);
      return response
    } catch (error) {
      throw error;
    }
  },
  UPLOAD_IMAGE : async(formData : FormData) => {
    try {
      const response = await POSTFILES(`${StationBaseURL}/uploadStationLogo`,formData);
      return response
    } catch (error) {
      throw error;
    }
  },

  GET_ALL_STATIONS : async() : Promise<CustomResponse<IStation[]>> =>  {
    try {
      const response = await GET(`${StationBaseURL}/getAllStations`);
      return response
    } catch (error) {
      throw error;
    }
  },

  DELETE_STATION : async(stationId:number)  =>  {
    try {
      const response = await DELETE(`${StationBaseURL}/deleteStation/${stationId}`);
      return response
    } catch (error) {
      throw error;
    }
  },

  

};
