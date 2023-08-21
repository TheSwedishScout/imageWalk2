import React from "react";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { IPathInfo } from "./NewMapWrapper";

export const PathInfo = ({
  pathInfo,
  setPathInfo,
}: {
  pathInfo: IPathInfo;
  setPathInfo: React.Dispatch<React.SetStateAction<IPathInfo>>;
}) => {
  return (
    <Card>
      <h1>Path Info</h1>
      <TextField
        id="pathName"
        label="Path name"
        value={pathInfo?.name || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPathInfo((info) => ({ ...info, name: event.target.value }));
        }}
      />
      <TextField
        id="pathDescription"
        label="Path description"
        value={pathInfo?.description || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPathInfo((info) => ({
            ...info,
            description: event.target.value,
          }));
        }}
      />
      <RadioGroup>
        <FormControl component="fieldset">
          <Typography variant="h6">Select Difficulty:</Typography>
          <RadioGroup
            aria-label="difficulty"
            name="difficulty"
            value={pathInfo?.difficulty || ""}
            onChange={(event) =>
              setPathInfo((info) => ({
                ...info,
                difficulty: event.target.value,
              }))
            }
          >
            <FormControlLabel value="easy" control={<Radio />} label="Easy" />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="hard" control={<Radio />} label="Hard" />
          </RadioGroup>
        </FormControl>
      </RadioGroup>
    </Card>
  );
};
