import React, { createContext, useState, useContext } from "react";
import { Option, Question } from "../models/interfaces/Questions";
import { Track } from "../models/interfaces/Track";
import { getRandomInt } from "../components/randomInt";

type ActiveRouteValue = {
  track:
    | {
        id: Track["id"];
        name: Track["name"];
        seed: number;
        difficulty: number;
      }
    | undefined;
  answeredQuestions: number[];
  score: number;
  updateTrack: (
    trackId: Track["id"],
    name: Track["name"],
    seed?: number,
    difficulty?: number
  ) => void;
  updateScore: (option: Option, points: number) => void;
  updateQuestion: (questionId: Question["id"]) => void;
};

const ActiveRoute = createContext<ActiveRouteValue | undefined>(undefined);

export const ActiveRouteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TODO: spara i local storage
  const [track, setTrack] = useState<{
    id: Track["id"];
    name: Track["name"];
    seed: number;
    difficulty: number;
  }>();
  const [answeredQuestions, setAnsweredQuestions] = useState<Question["id"][]>(
    []
  );
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<number>(10);

  const updateScore = (option: Option, points: number) => {
    if (answeredQuestions.includes(question)) {
      return;
    }
    if (option.isCorrect) {
      setScore((currentScore) => currentScore + points);
    }
    if (!option.isCorrect) {
      setScore((currentScore) => currentScore - points);
    }
    setAnsweredQuestions((answered) => [...answered, question]);
  };

  const updateTrack = (
    trackId: Track["id"],
    name: Track["name"],
    seed = getRandomInt(44983),
    difficulty = 1
  ) => {
    setTrack({ id: trackId, name, seed, difficulty });
  };

  const updateQuestion = (questionId: Question["id"]) => {
    setQuestion(questionId);
  };

  const contextValue = {
    track,
    answeredQuestions,
    score,
    updateScore,
    updateTrack,
    updateQuestion,
  } as ActiveRouteValue;

  return (
    <ActiveRoute.Provider value={contextValue}>{children}</ActiveRoute.Provider>
  );
};

export const useActiveRoute = (): ActiveRouteValue => {
  const context = useContext(ActiveRoute);

  if (!context) {
    throw new Error("useActiveRoute must be used within a ActiveRouteProvider");
  }

  return context;
};

export default ActiveRoute;
