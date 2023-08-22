import { useFetch } from "@/app/api/useFetch";
import { splitPathByImages } from "@/app/components/lib/cordinates";
import TrackMap from "@/app/components/track/TrackMap";
import { Button, Card, Modal, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Rutt() {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [currentSegment, setCurrentSegment] = useState<number>(0);
  const router = useRouter();
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
              width: "100vw",
              height: "100vh",
              backgroundColor: "#202020",
              color: "#E3E3E3",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {path.Images[currentSegment].name}
            </Typography>
            <Image
              src={path.Images[currentSegment].image}
              width={500}
              height={600}
              alt="image"
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {path.Images[currentSegment].description}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setModal(false), setCurrentSegment((current) => current++);
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
