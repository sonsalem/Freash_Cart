export interface UserInformationProps {
  data: UserInformationData;
}

export interface UserInformationData {
  role: string;
  active: boolean;
  wishlist: any[];
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  passwordResetCode: string;
  passwordResetExpires: Date;
  resetCodeVerified: boolean;
}
