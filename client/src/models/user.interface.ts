export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserProfileInfo {
  name: string,
}

export interface IUserToken {
  _id: string,
  email: string,
  token: string,
}