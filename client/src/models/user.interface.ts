export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserProfileInfo {
  name: string,
}

export interface UserToken {
  _id: string,
  email: string,
  token: string,
}