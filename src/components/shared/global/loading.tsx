import React from "react";

import "../../../styles/shared/global/loading.scss";
import gifPikachu from "../../../images/pikachuLoading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <img src={gifPikachu} alt="" />
    </div>
  );
}
