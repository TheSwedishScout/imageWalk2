import { useFetch } from "@/app/api/useFetch";
import { splitPathByImages } from "@/app/components/lib/cordinates";
import TrackMap from "@/app/components/track/TrackMap";
import { Button, Card, Modal, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

function Rutt() {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();
  const [currentSegment, setCurrentSegment] = useLocalStorage<number>(
    `${router.query.id}-segment`,
    0
  );
  const { data: path, isLoading } = useFetch(`/api/path/${router.query.id}`);
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }

  if (path) {
    const pathPos = JSON.parse(path.cordinates);

    const splittedPath = splitPathByImages(pathPos, path.Images);

    return (
      <div>
        <h1>Rutt {path.name}</h1>
        <div className="trackMapContainer">
          <TrackMap
            path={splittedPath}
            images={path.Images}
            currentSegment={0}
            isFollow={false}
            onCallbackCloseLocation={() => {
              setShowButton(true);
            }}
            onCallbackLocationFar={() => {
              setShowButton(false);
            }}
          />
          {showButton && (
            <Button
              variant="contained"
              className="openBtn"
              onClick={() => setModal(true)}
            >
              Öppna Bild
            </Button>
          )}
        </div>
        <Modal
          open={modal}
          onClose={() => {
            setModal(false);
          }}
        >
          <Card
            className="dark"
            sx={{
              padding: "1rem",
              width: "100vw",
              height: "100vh",
              backgroundColor: "#202020",
              color: "#E3E3E3",
            }}
          >
            <Typography
              textAlign={"center"}
              id="modal-modal-title"
              variant="h3"
              component="h2"
            >
              {path.Images[currentSegment].name}
            </Typography>
            <Image
              src={path.Images[currentSegment].image}
              width={path.Images[currentSegment].width}
              height={path.Images[currentSegment].height}
              alt="image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {path.Images[currentSegment].description}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                // TODO: Fix so that it cant increase by opening and closing modal more then once per location
                setModal(false);
                setCurrentSegment((current) => current++);
              }}
            >
              Stäng
            </Button>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default Rutt;
