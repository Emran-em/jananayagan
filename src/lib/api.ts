const API_BASE_URL = 'https://api.tvkcup2026.com/api'

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ProfileRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice?: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddressId: string;
  paymentMethod: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddressId: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  paymentRequest?: {
    merchantTransactionId: string;
    payload: {
      merchantId: string;
      merchantTransactionId: string;
      merchantUserId: string;
      amount: number;
      redirectUrl: string;
      redirectMode: string;
      callbackUrl: string;
      mobileNumber: string;
      paymentInstrument: {
        type: string;
      };
    };
    checksum: string;
    url: string;
  };
}

export interface PhonePePaymentResponse {
  success: boolean;
  message: string;
  data: {
    merchantTransactionId: string;
    payload: {
      merchantId: string;
      merchantTransactionId: string;
      merchantUserId: string;
      amount: number;
      redirectUrl: string;
      redirectMode: string;
      callbackUrl: string;
      mobileNumber: string;
      paymentInstrument: {
        type: string;
      };
    };
    checksum: string;
    url: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isProfileComplete: boolean;
  token: string;
}

export interface Address {
  _id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  district: string;
  postalCode: string;
  country: string;
  landmark: string;
  isDefault: boolean;
}

export interface BuyerInfo {
  createdAt: string
  dateOfBirth: string
  dist: string
  gmail: string
  name: string
  phone: string
  profileImage: null
  profileType: string
  state: string
  status: string
  updatedAt: string
  user: string
  __v: number
  _id: string
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  error?: unknown;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T> | ApiError> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        ...options,
        headers: {
          accept: "*/*",
          'Content-Type': 'application/json',
          ...options.headers,
        },
      };


      const response = await fetch(url, config);
      const data = await response.json();


      if (!response.ok) {

        return {
          success: false,
          message: data.message || 'An error occurred',
          error: data,
        };
      }

      return data;
    } catch (error) {
      console.error('API Service - Network error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error,
      };
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(token: string): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/users/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async googleLogin(accessToken: string): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    });
  }

  async getBuyerProfile(token: string): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/profiles/profiles', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createBuyerProfile(
    profileData: ProfileRequest,
    token: string
  ): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/profiles/profiles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  async updateBuyerProfile(
    profileData: Partial<ProfileRequest>,
    token: string
  ): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/profiles/profiles', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  async deleteBuyerProfile(token: string): Promise<ApiResponse<User> | ApiError> {
    return this.request<User>('/profiles/profiles', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createOrder(
    orderData: CreateOrderRequest,
    data: BuyerInfo,
    token: string
  ): Promise<ApiResponse<Order> | ApiError> {
    const payload = { ...orderData, ...data }
    const response = await this.request<Order>('/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return response;
  }


  async createPhonePePayment(
    orderId: string,
    token: string
  ): Promise<ApiResponse<{ redirectUrl?: string }> | ApiError> {
    return this.request<{ redirectUrl?: string }>(`/orders/${orderId}/payment/phonepe`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAddresses(token: string): Promise<ApiResponse<Address[]> | ApiError> {
    return this.request<Address[]>('/addresses', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}

export const apiService = new ApiService(API_BASE_URL);
