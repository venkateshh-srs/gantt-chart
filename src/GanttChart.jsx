import React, { useEffect, useState } from "react";
import Gantt from "frappe-gantt";

const GanttChart = ({ tasks }) => {
  const [gantt, setGantt] = useState(null);
  // console.log(props);

  useEffect(() => {
    if (tasks.length) {
      const ganttChart = new Gantt("#gantt", tasks, {
        // on_click: (task) => console.log("Task clicked", task),
        // on_date_change: (task, start, end) =>
        //   console.log("Date changed", task, start, end),
        // on_progress_change: (task, progress) =>
        //   console.log("Progress changed", task, progress),
        view_mode: "Day",
        infinite_padding: false,
        // view_mode_select: true,
        scroll_to: "start",
        // snap_at: "2d",
        // container_height: 900,
        padding: 40,
      });

      setGantt(ganttChart);
    }
  }, [tasks]);

  return <div id="gantt"></div>;
};
export default GanttChart;
