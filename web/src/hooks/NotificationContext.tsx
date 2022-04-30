import { useContext, createContext, useState } from "react";

interface INotificationContext {
  snackbarOpen: boolean;
  setSnackbarOpen: Function;
  snackbarMessage: string;
  setSnackbarMessage: Function;
  addNotification: Function;
}

const NotificationContext = createContext<INotificationContext>({
  snackbarOpen: false,
  setSnackbarOpen: () => {},
  snackbarMessage: "",
  setSnackbarMessage: () => {},
  addNotification: () => {},
});

function NotificationContextProvider({ children }) {
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
}

const useNotificationContext = () => useContext(NotificationContext);

export {
  INotificationContext,
  useNotificationContext,
  NotificationContextProvider,
};
