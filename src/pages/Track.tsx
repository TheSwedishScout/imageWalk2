"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/app/api/useFetch";
import MapWrapper from "@/app/components/MapWrapper";
import TrackStepper from "@/app/components/TrackStepper";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useActiveRoute } from "@/app/stores/TrackStore";
import { useRouter } from "next/router";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

export default function Track() {
  const { score, track, answeredQuestions } = useActiveRoute();

  // const trackId = 4324;

  const apiEndpoint = process.env.NEXT_PUBLIC_ENDPOINT ?? "";
  const [trackApiUrl, setTrackApiUrl] = useState<string>("");
  const [questionApiUrl, setQuestionApiUrl] = useState<string>("");

  const { data: trackData, isLoading: trackDataLoading } =
    useFetch(trackApiUrl);

  const { data: questionData, isLoading: questionDataLoading } =
    useFetch(questionApiUrl);

  useEffect(() => {
    setTrackApiUrl(`${apiEndpoint}/Track/${track?.id}`);
    setQuestionApiUrl(`${apiEndpoint}/Quiz/${track?.id}`);
  }, [track]);

  const router = useRouter();

  useEffect(() => {
    if (!track) {
      router.push("/");
    }
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography
            variant="h2"
            color="primary"
            sx={{ paddingLeft: "0.5rem" }}
          >
            {trackData?.name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                color="primary"
                sx={{ paddingTop: "1rem" }}
              >
                Poäng:{score}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="secondary">Nisse Hult</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TrackStepper
        numberOfSteps={questionData?.length ?? 0}
        completedSteps={answeredQuestions.length}
      />
      <Box sx={{ marginTop: "1rem" }}>
        {!trackDataLoading && !questionDataLoading && (
          <>
            <MapWrapper
              userId={0}
              userName={""}
              track={trackData}
              questions={questionData}
            />
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                aria-label="add"
                sx={{ mr: 2, backgroundColor: "green", color: "white" }}
              >
                <AddLocationAltIcon /> Visa fråga
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
