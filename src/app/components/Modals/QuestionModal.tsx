import React, { useEffect, useState } from "react";
import { Question, Option } from "@/app/models/interfaces/Questions";
import { Modal, Box, Grid, Typography } from "@mui/material";
import AnswerCounter from "../AnswerCounter";
import AnswerButtons from "../AnswerButtons";
import { useActiveRoute } from "@/app/stores/TrackStore";

interface Props {
  question: Question | undefined;
  handleCloseModal: () => void;
}

export default function QuestionModal({ question, handleCloseModal }: Props) {
  const [points, setPoints] = useState(0);
  const { updateQuestion, updateScore } = useActiveRoute();

  function handleSave(option: Option): void {
    updateScore(option, points);
    handleCloseModal();
  }
  useEffect(() => {
    if (question?.id) {
      updateQuestion(question.id);
    }
  }, [question]);

  useEffect(() => {
    if (points === 0 && question) {
      handleSave(question.options[0]);
    }
  }, [points]);

  return question ? (
    <Modal open={true}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vh",
          maxWidth: "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="inherit">{question?.text}</Typography>
          </Grid>
          <Grid item xs={2}>
            <AnswerCounter handlePoints={(p) => setPoints(p)} />
          </Grid>
          <Grid item xs={12}>
            <AnswerButtons
              options={question?.options}
              handleSaveAnswer={handleSave}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  ) : null;
}
