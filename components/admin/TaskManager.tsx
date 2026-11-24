const tasks = [
  {
    title: "Create promotional video",
    category: "Video Production",
    status: "In Progress",
    priority: "High",
  },
  {
    title: "Build client website",
    category: "Web Development",
    status: "Pending",
    priority: "High",
  },
  {
    title: "Prepare Instagram content",
    category: "Social Media",
    status: "Completed",
    priority: "Medium",
  },
  {
    title: "Create brand graphics",
    category: "Design",
    status: "Pending",
    priority: "Low",
  },
];

export default function TaskManager() {
  return (
    <section className="task-manager">

      <div className="task-manager-header">
        <div>
          <p className="admin-header-label">
            WORK MANAGEMENT
          </p>

          <h2>Today&apos;s Focus</h2>
        </div>

        <button className="add-task-button">
          + New Task
        </button>
      </div>

      <div className="tasks-list">

        {tasks.map((task) => (
          <div
            className="task-row"
            key={task.title}
          >

            <div className="task-main">

              <div className="task-checkbox">
                {task.status === "Completed"
                  ? "✓"
                  : ""}
              </div>

              <div>
                <h3>{task.title}</h3>

                <p>{task.category}</p>
              </div>

            </div>

            <div className="task-meta">

              <span
                className={`priority priority-${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

              <span
                className={`task-status status-${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {task.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}