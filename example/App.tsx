import React = require("react");
import Lightbox from "../src/index";

const lb = new Lightbox();

export const App = (): JSX.Element => {
  return (
    <div>
      <Lightbox
        image="https://source.unsplash.com/random"
        title="Image Title"
      ></Lightbox>
    </div>
  );
};
