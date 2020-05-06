import React from "react";
import "./App.css";
import my_tasks from "./components/data";
import List from "./components/List";

function App() {
  return (
    <div>
      {/* my_tasks приходить з data.js */}

      <List tasks={my_tasks} />
    </div>
  );
}

export default App;
