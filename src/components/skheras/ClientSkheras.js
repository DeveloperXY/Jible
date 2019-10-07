import React from "react";
import "./css/clientSkheras.css";
import ClientSkhera from "./ClientSkhera";

const ClientSkheras = ({ skheras }) =>
  skheras.fulfilled && (
    <div className="my-skheras-container">
      {skheras.value.map((skhera, index) => (
        <ClientSkhera skhera={skhera} index={index} />
      ))}
    </div>
  );

export default ClientSkheras;
