import React = require("react");
import Lightbox from "../dist";
import "../dist/style.css";
import { useState } from "react";

export const App = (): JSX.Element => {
  const [showLightBox, setShowLightBox] = useState<boolean>(false);

  return (
    <div>
      <img
        style={{ height: "200px" }}
        src="https://source.unsplash.com/random"
        onClick={() => setShowLightBox(true)}
      />
      {showLightBox ? (
        <Lightbox
          image="https://source.unsplash.com/random"
          title="Image Title"
          allowZoom={false}
          allowRotate={false}
          clickOutsideToExit={true}
          onClose={() => setShowLightBox(false)}
        ></Lightbox>
      ) : null}
    </div>
  );
};
