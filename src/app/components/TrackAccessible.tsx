import Image from "next/image";
import React from "react";

const TrackAccessible = ({ accessible = false }: { accessible?: boolean }) => {
  if (!accessible) return null;
  return (
    <Image
      src={"/icons/wheelchair.svg"}
      alt="React Logo"
      width={25}
      height={25}
      style={{ display: "inline-block" }}
    />
  );
};

export default TrackAccessible;
