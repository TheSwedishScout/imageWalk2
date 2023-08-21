import { Coordinate } from "./Track";

export interface Question {
  id: number;
  text: string;
  coordinate: Coordinate;
  options: Option[];
  difficulty: number;
}

export interface Option {
  option: string;
  isCorrect: boolean;
}
