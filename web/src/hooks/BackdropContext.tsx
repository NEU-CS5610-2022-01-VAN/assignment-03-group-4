import { useContext, createContext, useState } from "react";

interface IBackdropContext {
  backdropOpen: boolean;
  setBackdropOpen: Function;
  backdropMessage: string;
  setBackdropMessage: Function;
  addBackdrop: Function;
}

const BackdropContext = createContext<IBackdropContext>({
  backdropOpen: false,
  setBackdropOpen: () => {},
  backdropMessage: "",
  setBackdropMessage: () => {},
  addBackdrop: () => {},
});

function BackdropContextProvider({ children }) {
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [backdropMessage, setBackdropMessage] = useState<string>("");

  const addBackdrop = (message: string) => {
    console.log(message);
    setBackdropMessage(message);
    setBackdropOpen(true);
  };

  const value = {
    backdropOpen,
    setBackdropOpen,
    backdropMessage,
    setBackdropMessage,
    addBackdrop,
  };

  return (
    <BackdropContext.Provider value={value}>
      {children}
    </BackdropContext.Provider>
  );
}

const useBackdropContext = () => useContext(BackdropContext);

export { IBackdropContext, useBackdropContext, BackdropContextProvider };
