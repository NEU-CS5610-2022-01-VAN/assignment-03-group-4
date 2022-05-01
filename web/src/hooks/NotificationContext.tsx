import { useContext, createContext, useState } from "react";

const NotificationContext = createContext<INotificationContext>({
  snackbarOpen: false,
  setSnackbarOpen: () => {},
  snackbarMessage: "",
  setSnackbarMessage: () => {},
  addNotification: () => {},
});

type Props = { children: React.ReactNode };

const NotificationContextProvider = ({ children }: Props): JSX.Element => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const addNotification = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const value = {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => useContext(NotificationContext);

export { useNotificationContext, NotificationContextProvider };
