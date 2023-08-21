import { theme } from "@/pages/lib/theme";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  message?: string;
}
const navStyles = {
  color: theme.palette.primary.main,
  justifyContent: "center",
  typography: theme.typography,
};
export default function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    <Backdrop open={true} invisible={true} sx={{ position: "absolute" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} color="primary" />
        <Typography
          variant="h5"
          sx={{ position: "fixed", top: "40%" }}
          style={navStyles}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
