import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  handlePoints: (points: number) => void;
}
export default function AnswerCounter({ handlePoints }: Props) {
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    if (seconds >= 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      handlePoints(seconds);
      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{ color: "primary" }}
        value={seconds * 10}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="div" color="primary">
          {seconds}
        </Typography>
      </Box>
    </Box>
  );
}
