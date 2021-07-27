export interface User {
  name: String;
  email: String;
  password: String;
}

export interface UserProfileInfo {
  name: String,
}

export interface UserToken {
  _id: String,
  email: String,
  token: String,
}