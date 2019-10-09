import React from "react";
import Skhera from "./skhera/skhera-view";
import {
  SkherasContainer,
  LoadingContainer,
  ColoredCircularProgress
} from "./style";

const Skheras = ({ skheras }) => {
  if (skheras.pending)
    return (
      <LoadingContainer>
        <ColoredCircularProgress size={120} />
        <div className="loading-label">Loading...</div>
      </LoadingContainer>
    );
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
