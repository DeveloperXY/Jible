import React from "react";
import Skhera from "./skhera/skhera-view";
import { SkherasContainer } from "./style";
import Loading from "../Loading";

const Skheras = ({ skheras }) => {
  if (skheras.pending) return <Loading />;
  else if (skheras.fulfilled)
    return (
      <SkherasContainer>
        {skheras.value.map((skhera, index) => (
          <Skhera skhera={skhera} index={index} />
        ))}
      </SkherasContainer>
    );
};

export default Skheras;
