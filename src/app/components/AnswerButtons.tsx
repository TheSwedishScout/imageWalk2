import React from "react";
import { Option } from "@/app/models/interfaces/Questions";
import { Button, Grid } from "@mui/material";

interface Props {
  options: Option[];
  handleSaveAnswer: (option: Option) => void;
}

export default function AnswerButtons({ options, handleSaveAnswer }: Props) {
  const btnColors = ["green", "red", "orange", "blue"];

  return (
    <Grid container spacing={1}>
      {options.map((option, index) => (
        <Grid key={index} item xs={6}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: btnColors[index],
              width: "100%",
            }}
            onClick={() => handleSaveAnswer(option)}
          >
            {option.option}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
