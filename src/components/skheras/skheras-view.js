import React from "react";
import Skhera from "./skhera/skhera-view";
import { SkherasContainer } from "./style";

const Skheras = ({ skheras }) =>
  skheras.fulfilled && (
    <SkherasContainer>
      {skheras.value.map((skhera, index) => (
        <Skhera skhera={skhera} index={index} />
      ))}
    </SkherasContainer>
  );

export default Skheras;
