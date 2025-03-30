import React, { useState } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import GrowwClone from "./GrowwClone.js";

function App() {
  return <GrowwClone />;
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);