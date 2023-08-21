import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import Map from "./Map";
import { TriviaTrekProps } from "../models/interfaces/TriviaTrekProps";

export default function MapWrapper({
  userId,
  userName,
  track,
  questions,
}: TriviaTrekProps) {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_KEY ?? "";

  return (
    <Box sx={{ minWidth: 120 }}>
      <Wrapper apiKey={mapApiKey}>
        <Map
          userId={userId}
          userName={userName}
          track={track}
          questions={questions}
        />
      </Wrapper>
    </Box>
  );
}
