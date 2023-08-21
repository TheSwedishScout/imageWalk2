import React, { useState } from "react";
import { Button, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import EditMap from "./Map";
import { LatLng } from "../lib/cordinates";
import { LocationImage } from "@prisma/client";
import { PathInfo } from "./pathInfo";
import { ImageInfo } from "./ImageInfo";
import { v4 as uuidv4 } from "uuid";

export type IPathInfo = {
  name: string | null;
  description: string | null;
  difficulty: string | null;
  id: string;
};
export type ILocationImage = LocationImage & { imageFile?: string };
export type MapTools = "hand" | "path" | "image";
export default function NewMapWrapper() {
  const [tool, setTool] = useState<MapTools>("hand");
  const [path, setPath] = useState<LatLng[]>([]);
  const [pathInfo, setPathInfo] = useState<IPathInfo>({
    name: null,
    description: null,
    difficulty: null,
    id: uuidv4(),
  });
  const [images, setImages] = useState<ILocationImage[]>([]);
  const savePath = () => {
    // validate data
    // save data
    const formData = new FormData();
    formData.append("path", JSON.stringify(path));
    formData.append("pathInfo", JSON.stringify(pathInfo));
    formData.append("images", JSON.stringify(images));
    fetch("/api/savePath", {
      method: "POST",
      body: formData,
    });
  };

  const handleToolSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: MapTools
  ) => {
    setTool(newAlignment);
  };
  return (
    <Grid width={"100%"} container spacing={2}>
      <Grid item xs="auto">
        <PathInfo pathInfo={pathInfo} setPathInfo={setPathInfo} />
      </Grid>
      <Grid item xs>
        <ToggleButtonGroup
          value={tool}
          exclusive
          onChange={handleToolSelect}
          aria-label="Map Tool"
        >
          <ToggleButton value="hand" aria-label="hand">
            Hand
          </ToggleButton>
          <ToggleButton value="path" aria-label="draw path">
            Path
          </ToggleButton>
          <ToggleButton value="image" aria-label="add image">
            Image
          </ToggleButton>
        </ToggleButtonGroup>
        <EditMap
          setPath={setPath}
          pathInfo={pathInfo}
          path={path}
          tool={tool}
          images={images}
          setImages={setImages}
        />
      </Grid>
      <Grid item xs="auto">
        <ImageInfo images={images} setImages={setImages} />
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained" onClick={savePath}>
          Spara
        </Button>
      </Grid>
    </Grid>
  );
}
