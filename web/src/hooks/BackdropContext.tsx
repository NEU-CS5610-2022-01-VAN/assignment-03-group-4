import { useContext, createContext, useState } from "react";

const BackdropContext = createContext<IBackdropContext>({
  backdropOpen: false,
  setBackdropOpen: () => {},
  backdropMessage: "",
  setBackdropMessage: () => {},
  addBackdrop: () => {},
});

type Props = { children: React.ReactNode };

const BackdropContextProvider = ({ children }: Props): JSX.Element => {
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
};

const useBackdropContext = () => useContext(BackdropContext);

export { useBackdropContext, BackdropContextProvider };
