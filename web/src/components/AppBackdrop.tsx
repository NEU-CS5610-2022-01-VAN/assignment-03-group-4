import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useBackdropContext } from "../hooks/BackdropContext";

const AppBackdrop = () => {
  const { backdropOpen, setBackdropOpen, backdropMessage } =
    useBackdropContext();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
      onClick={() => setBackdropOpen(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>{backdropMessage}</h3>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default AppBackdrop;
