"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  due_date: string | null;
  project_id: number | null;
  project_name?: string;
};

type Project = {
  id: number;
  name: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Web Development");

  const [status, setStatus] =
    useState<
      "Pending" |
      "In Progress" |
      "Completed"
    >("Pending");

  const [priority, setPriority] =
    useState<
      "High" |
      "Medium" |
      "Low"
    >("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [projectId, setProjectId] =
    useState("");


  /* ========================================
     LOAD TASKS
  ======================================== */

  useEffect(() => {
    let isActive = true;

    async function loadTasks() {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/tasks"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load tasks"
          );
        }

        const data = await response.json();

        if (isActive) {
          setTasks(data);
        }
      } catch (error) {
        console.error(
          "LOAD TASKS ERROR:",
          error
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    async function loadProjects() {
      try {
        const response = await fetch(
          "/api/projects"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load projects"
          );
        }

        const data = await response.json();

        if (isActive) {
          setProjects(data);
        }
      } catch (error) {
        console.error(
          "LOAD PROJECTS ERROR:",
          error
        );
      }
    }

    void loadTasks();
    void loadProjects();

    return () => {
      isActive = false;
    };
  }, []);


  /* ========================================
     RESET FORM
  ======================================== */

  function resetForm() {

    setTitle("");

    setDescription("");

    setCategory(
      "Web Development"
    );

    setStatus("Pending");

    setPriority("Medium");

    setDueDate("");

    setProjectId("");

    setEditingTaskId(null);
  }


  /* ========================================
     CREATE FORM
  ======================================== */

  function openCreateForm() {

    resetForm();

    setShowForm(true);
  }


  /* ========================================
     EDIT TASK
  ======================================== */

  function editTask(task: Task) {

    setEditingTaskId(task.id);

    setTitle(task.title);

    setDescription(
      task.description || ""
    );

    setCategory(task.category);

    setStatus(task.status);

    setPriority(task.priority);

    setDueDate(
      task.due_date
        ? task.due_date.substring(
            0,
            10
          )
        : ""
    );

    setProjectId(
      task.project_id
        ? String(task.project_id)
        : ""
    );

    setShowForm(true);
  }


  /* ========================================
     SAVE TASK
  ======================================== */

  async function saveTask(
    event: React.FormEvent
  ) {

    event.preventDefault();

    if (!title || !category) {

      alert(
        "Title and category are required."
      );

      return;
    }

    try {

      const isEditing =
        editingTaskId !== null;

      const response = await fetch(
        "/api/tasks",
        {
          method: isEditing
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...(isEditing && {
              id: editingTaskId,
            }),

            title,

            description:
              description || null,

            category,

            status,

            priority,

            due_date:
              dueDate || null,

            project_id:
              projectId
                ? Number(projectId)
                : null,

          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.error ||
            "Something went wrong."
        );

        return;
      }


      /* UPDATE */

      if (isEditing) {

        setTasks(
          (currentTasks) =>
            currentTasks.map(
              (task) =>
                task.id ===
                editingTaskId
                  ? data
                  : task
            )
        );

      }

      /* CREATE */

      else {

        setTasks(
          (currentTasks) => [
            data,
            ...currentTasks,
          ]
        );

      }

      resetForm();

      setShowForm(false);

    } catch (error) {

      console.error(
        "SAVE TASK ERROR:",
        error
      );

      alert(
        "Something went wrong."
      );
    }
  }


  /* ========================================
     DELETE TASK
  ======================================== */

  async function deleteTask(
    taskId: number
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmed) {
      return;
    }

    try {

      const response =
        await fetch(
          "/api/tasks",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: taskId,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.error ||
            "Failed to delete task."
        );

        return;
      }

      setTasks(
        (currentTasks) =>
          currentTasks.filter(
            (task) =>
              task.id !== taskId
          )
      );

    } catch (error) {

      console.error(
        "DELETE TASK ERROR:",
        error
      );

      alert(
        "Something went wrong."
      );
    }
  }


  /* ========================================
     TODAY'S FOCUS
  ======================================== */

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !==
        "Completed"
    );


  /* ========================================
     PAGE
  ======================================== */

  return (

    <div className="tasks-page">

      {/* HEADER */}

      <div className="tasks-header">

        <div>

          <p className="admin-header-small">
            WORK MANAGEMENT
          </p>

          <h1>
            Tasks
          </h1>

          <p>
            Organize daily work and
            manage your team&apos;s focus.
          </p>

        </div>


        <button
          className="new-project-button"
          onClick={
            openCreateForm
          }
        >
          + New Task
        </button>

      </div>


      {/* TODAY'S FOCUS */}

      <div className="todays-focus">

        <div>

          <p className="admin-header-small">
            TODAY&apos;S FOCUS
          </p>

          <h2>
            Choose what matters today.
          </h2>

          <p>
            {pendingTasks.length}{" "}
            active tasks remaining
          </p>

        </div>


        <div className="focus-categories">

          <button
            onClick={() =>
              setCategory(
                "Video Creation"
              )
            }
          >
            🎬
            <span>
              Video Creation
            </span>
          </button>


          <button
            onClick={() =>
              setCategory(
                "Web Development"
              )
            }
          >
            💻
            <span>
              Web Development
            </span>
          </button>


          <button
            onClick={() =>
              setCategory(
                "Graphic Design"
              )
            }
          >
            🎨
            <span>
              Graphic Design
            </span>
          </button>


          <button
            onClick={() =>
              setCategory(
                "Social Media"
              )
            }
          >
            📱
            <span>
              Social Media
            </span>
          </button>


          <button
            onClick={() =>
              setCategory(
                "Marketing"
              )
            }
          >
            📢
            <span>
              Marketing
            </span>
          </button>

        </div>

      </div>


      {/* FORM */}

      {showForm && (

        <div className="project-form-container">

          <div className="project-form-header">

            <div>

              <p className="admin-header-small">
                TASK MANAGEMENT
              </p>

              <h2>
                {editingTaskId
                  ? "Edit Task"
                  : "Create New Task"}
              </h2>

            </div>


            <button
              className="close-form-button"
              onClick={() => {

                resetForm();

                setShowForm(false);

              }}
            >
              ×
            </button>

          </div>


          <form
            onSubmit={saveTask}
          >

            <div className="form-grid">


              {/* TITLE */}

              <div className="form-group">

                <label>
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Create promotional video"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* CATEGORY */}

              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                >

                  <option>
                    Web Development
                  </option>

                  <option>
                    Video Creation
                  </option>

                  <option>
                    Graphic Design
                  </option>

                  <option>
                    Social Media
                  </option>

                  <option>
                    Marketing
                  </option>

                  <option>
                    Photography
                  </option>

                </select>

              </div>


              {/* PROJECT */}

              <div className="form-group">

                <label>
                  Project
                </label>

                <select
                  value={projectId}
                  onChange={(event) =>
                    setProjectId(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    No Project
                  </option>

                  {projects.map(
                    (project) => (

                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.name}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* DUE DATE */}

              <div className="form-group">

                <label>
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* PRIORITY */}

              <div className="form-group">

                <label>
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target
                        .value as
                        | "High"
                        | "Medium"
                        | "Low"
                    )
                  }
                >

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>

                </select>

              </div>


              {/* STATUS */}

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target
                        .value as
                        | "Pending"
                        | "In Progress"
                        | "Completed"
                    )
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>


              {/* DESCRIPTION */}

              <div
                className="form-group"
                style={{
                  gridColumn:
                    "1 / -1",
                }}
              >

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Describe what needs to be done..."
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={4}
                />

              </div>

            </div>


            {/* ACTIONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => {

                  resetForm();

                  setShowForm(false);

                }}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="create-project-button"
              >
                {editingTaskId
                  ? "Update Task"
                  : "Create Task"}
              </button>

            </div>

          </form>

        </div>

      )}


      {/* TASK LIST */}

      <div className="tasks-list">

        <div className="tasks-list-header">

          <span>
            TASK
          </span>

          <span>
            CATEGORY
          </span>

          <span>
            PROJECT
          </span>

          <span>
            PRIORITY
          </span>

          <span>
            STATUS
          </span>

          <span>
            DUE DATE
          </span>

          <span>
            ACTIONS
          </span>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="no-projects">
            Loading tasks...
          </div>

        )}


        {/* TASKS */}

        {!loading &&
          tasks.map((task) => (

            <div
              className="task-row"
              key={task.id}
            >

              <div>

                <strong>
                  {task.title}
                </strong>

                {task.description && (

                  <small>
                    {task.description}
                  </small>

                )}

              </div>


              <span>
                {task.category}
              </span>


              <span>
                {task.project_name ||
                  "No Project"}
              </span>


              <span>

                <span
                  className={`project-priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

              </span>


              <span>

                <span
                  className={`project-status ${task.status
                    .toLowerCase()
                    .replace(
                      " ",
                      "-"
                    )}`}
                >
                  {task.status}
                </span>

              </span>


              <span>

                {task.due_date
                  ? task.due_date.substring(
                      0,
                      10
                    )
                  : "No date"}

              </span>


              <div className="project-actions">

                <button
                  className="edit-project-button"
                  onClick={() =>
                    editTask(task)
                  }
                >
                  Edit
                </button>


                <button
                  className="delete-project-button"
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}


        {/* EMPTY */}

        {!loading &&
          tasks.length === 0 && (

            <div className="no-projects">

              No tasks yet.

              <br />

              Create your first task
              to start managing
              today&apos;s work.

            </div>

          )}

      </div>

    </div>
  );
}