export interface IUser extends IUserLogin {
  firstName: string;
  lastName: string;
  phone?: number;
  city?: string;
  street?: string;
  number?: number;
  zipcode?: number;
}

export interface IResponse {
  status: string;
  message?: string;
  data: IUser | IUser[];
}

export interface IUserLogin {
  email: string;
  pass: string;
  id?: number;
}
