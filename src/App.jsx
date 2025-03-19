import React from "react";
import { useState, useEffect } from "react";
import GanttChart from "./GanttChart";
import UserInput from "./UserInput";

// useEffect(() => {}, []);

const App = () => {
  //   console.log(sampleTasks);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="container">
        <UserInput setData={setData} setLoading={setLoading} />
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div>
            <GanttChart data={data} />
          </div>
        )}
      </div>
    </>
  );
};
export default App;
