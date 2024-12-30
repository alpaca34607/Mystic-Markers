import React from "react";
import useRandomText from "./RandomText";
import "../style.scss";

const SectionTitle = ({ originalText, className }) => {
  const [text, startRandom] = useRandomText(originalText);

  return (
    <h2
      className={className}
      onMouseEnter={startRandom}
      style={{
      cursor: "crosshair",
      }}
    >
      {text}
    </h2>
  );
};

export default SectionTitle;