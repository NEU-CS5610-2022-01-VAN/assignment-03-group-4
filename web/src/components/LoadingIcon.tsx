import { Box, CircularProgress } from "@mui/material";

const LoadingIcon = (): JSX.Element => (
  <Box
    sx={{
      ml: "3vw",
      mt: "3.5vh",
      mb: "2vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
    }}
  >
    <CircularProgress sx={{ color: "#444" }} />
  </Box>
);

export default LoadingIcon;
