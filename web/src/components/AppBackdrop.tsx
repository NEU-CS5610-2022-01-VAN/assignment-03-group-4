import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";

const AppBackdrop = ({ text }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => setOpen(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>{text}</h3>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default AppBackdrop;
