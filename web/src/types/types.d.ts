export interface IUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
  upatedAt: string;
  recipes: any[];
  reviews: any[];
}

export interface IAUth0User {
  sub: string;
}

export interface IUseAuth0 {
  user?: IAUth0User;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: Error | undefined;
}
