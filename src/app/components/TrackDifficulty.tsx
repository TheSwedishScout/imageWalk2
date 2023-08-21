import Image from "next/image";
import React from "react";
import { Track } from "../models/interfaces/Track";

interface TrackDifficultyProps {
  level: Track["level"];
}

const TrackDifficulty = ({ level }: TrackDifficultyProps) => {
  switch (level) {
    case 1:
      return (
        <Image
          src={"/icons/difficulty_1.svg"}
          alt="React Logo"
          width={25}
          height={25}
          style={{ display: "inline-block" }}
        />
      );
    case 2:
      return (
        <Image
          src={"/icons/difficulty_2.svg"}
          alt="React Logo"
          width={25}
          height={25}
          style={{ display: "inline-block" }}
        />
      );
    case 3:
      return (
        <Image
          src={"/icons/difficulty_3.svg"}
          alt="React Logo"
          width={25}
          height={25}
          style={{ display: "inline-block" }}
        />
      );
    default:
      return null;
  }
};
export default TrackDifficulty;
