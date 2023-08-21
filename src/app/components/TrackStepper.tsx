import { Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  numberOfSteps: number;
  completedSteps: number;
}
export default function TrackStepper({ numberOfSteps, completedSteps }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={completedSteps} alternativeLabel>
        {[...Array(numberOfSteps)].map((_, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
