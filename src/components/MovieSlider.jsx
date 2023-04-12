import React from "react";

export default function MovieSlider({ children }) {
  return (
    <div className="no-scroll-bar flex gap-6 overflow-x-scroll">{children}</div>
  );
}
