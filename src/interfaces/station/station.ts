export interface IImageUrl {
  url: string;
  publicId: string;
}

export interface IStation {
  id?: number;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
  operatingHours: string;
  assignedEmployees: number;
  imageUrl?: IImageUrl;
  fuelTypesAvailable: string[];
  facilities: string[];
  lowOnStock: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  // Optional fields that might be present in your system
  description?: string;
  sales?: string;
  fuelStock?: string;
  colors?: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

// For the file upload response from your API
interface IUploadResponse {
  data: IImageUrl[];
  message: string;
  error: boolean;
}

// For the select options in your form
interface IFormOptions {
  fuelTypes: string[];
  facilities: string[];
  statusOptions: Array<'active' | 'inactive'>;
}