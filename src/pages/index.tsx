import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Typography>
        Välkommen till Art walk en konstvandring! Upplev konstens magi genom att
        välja din egen promenadväg och utforska konstverk inspirerade av
        verkliga platser. Ta del av flera konstverk under varje promenad och låt
        konstnärernas visioner och berättelser komma till liv genom din
        mobilskärm. Bli en del av denna unika och interaktiva konstupplevelse
        idag!
      </Typography>
      <Link href={"/bana"}>Till vandringarna!</Link>
    </div>
  );
};
export default LandingPage;
