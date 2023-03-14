import { useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Buffer } from "buffer/";
window.Buffer = Buffer;
function App() {
  return (
    <div className="w-96 font-saira bg-slate-50">
      <Navbar />
      <Body />
    </div>
  );
}

export default App;
