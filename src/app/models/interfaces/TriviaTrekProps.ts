import { Question } from "./Questions";
import { Track } from "./Track";

export interface TriviaTrekProps {
  userId?: number;
  userName?: string;
  track: Track | null;
  questions?: Question[] | [];
}
