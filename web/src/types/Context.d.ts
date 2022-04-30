interface IUserContext {
  user?: IUser;
  userPicture?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface IBackdropContext {
  backdropOpen: boolean;
  setBackdropOpen: Function;
  backdropMessage: string;
  setBackdropMessage: Function;
  addBackdrop: Function;
}

interface INotificationContext {
  snackbarOpen: boolean;
  setSnackbarOpen: Function;
  snackbarMessage: string;
  setSnackbarMessage: Function;
  addNotification: Function;
}

interface IAuth0TokenContext {
  accessToken?: string;
  setAccessToken: Funtion;
}

interface IUseAuth0 {
  user?: IAUth0User;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: Error | undefined;
}
