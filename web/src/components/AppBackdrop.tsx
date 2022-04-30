import { Box, CircularProgress, Typography } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{backdropMessage}</Typography>
        <CircularProgress
          color="inherit"
          sx={{ marginTop: 3 }}
          size={40}
          thickness={4}
        />
      </Box>
    </Backdrop>
  );
};

export default AppBackdrop;
