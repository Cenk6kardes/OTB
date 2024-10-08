export interface ISignInCredentials {
  userNameOrEmail: string;
  password: string;
}
export interface ISignUpCredentials {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignUpResponse {
  id: string;
  message: string;
  isSuccess: boolean;
}

export interface IUser {
  userId: string;
  displayName: string;
  userName: string;
  gravatarImageUrl: string;
}

export interface IToken {
  token: {
    acessToken: string; // TODO: Typo accessToken comes from backend model will be fixed later
    refreshToken: string;
    expirationDate: string;
  };
}

export type User = IUser & IToken;
