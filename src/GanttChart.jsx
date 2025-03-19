import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

const GanttChart = ({ data }) => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    if (ganttContainer.current && data) {
      const users = data.users;
      const tasks = data.tasks;
      const links = data.links;
      gantt.serverList("users", users);
      console.log(users, tasks, links);

      gantt.config.date_format = "%Y-%m-%d %H:%i";
      gantt.config.step = 1;
      gantt.config.min_column_width = 30;
      gantt.config.fit_tasks = true;
      // gantt.config.grid_resize = true; // Enables column resizing

      gantt.config.columns = [
        { name: "text", label: "Task", tree: true, width: 80 },
        {
          name: "assigned",
          label: "Assigned To",
          align: "center",
          width: 200,
          template: function (task) {
            if (!task.user_ids || task.user_ids.length === 0)
              return "Unassigned";
            return task.user_ids
              .map((id) => {
                let user = users.find((u) => u.key == id);
                return user ? user.label : "Unknown";
              })
              .join(", ");
          },
        },
        {
          name: "start_date",
          label: "Start Date",
          align: "center",
          width: 80,
        },
        { name: "duration", label: "Duration", align: "center", width: 80 },
        { name: "add", label: "", width: 44 },
      ];

      gantt.locale.labels.section_assigned_users = "Users";

      gantt.config.lightbox.sections = [
        {
          name: "description",
          height: 70,
          map_to: "text",
          type: "textarea",
          focus: true,
        },
        {
          name: "assigned_users",
          height: 50,
          map_to: "user_ids",
          type: "checkbox",
          options: gantt.serverList("users"),
        },
        { name: "time", height: 72, type: "duration", map_to: "auto" },
      ];

      gantt.init(ganttContainer.current);
      gantt.parse({ tasks, links });
    }
  }, []);

  return (
    <div ref={ganttContainer} style={{ width: "100%", height: "500px" }}></div>
  );
};

export default GanttChart;
