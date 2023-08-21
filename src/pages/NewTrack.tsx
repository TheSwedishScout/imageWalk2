import LoadingComponent from "@/app/components/LoadingComponent";
import NewMapWrapper from "@/app/components/newTrack/NewMapWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const NewTrack = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (!status) {
    return <LoadingComponent />;
  }

  return (
    <div className="Hitta">
      <NewMapWrapper />
    </div>
  );
};

export default NewTrack;
