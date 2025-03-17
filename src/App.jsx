import React from "react";
import { useState, useEffect } from "react";
import GanttChart from "./GanttChart";
import UserInput from "./UserInput";

// useEffect(() => {}, []);

const App = () => {
  //   console.log(sampleTasks);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="container">
        
        <UserInput setTasks={setTasks} setLoading={setLoading} />
        {/* <div>hi</div> */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div>
            <GanttChart tasks={tasks} />
          </div>
        )}
      </div>
    </>
  );
};
export default App;
