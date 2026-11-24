"use client";

import { useEffect, useState } from "react";

type Client = {
  id: number;
  name: string;
  company?: string;
};

type Project = {
  id: number;
  name: string;

  // New client relationship
  client_id: number | null;
  client_name?: string | null;
  client_company?: string | null;

  // Old field kept for compatibility
  client?: string | null;

  service: string;
  deadline: string;
  budget: string | number;

  priority: "High" | "Medium" | "Low";

  status:
    | "In Progress"
    | "Pending"
    | "Completed";

  created_at?: string;
};

export default function ProjectsPage() {
  /* =========================================
     PROJECTS
  ========================================= */

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  /* =========================================
     CLIENTS
  ========================================= */

  const [clients, setClients] =
    useState<Client[]>([]);

  const [clientsLoading, setClientsLoading] =
    useState(true);

  /* =========================================
     FORM
  ========================================= */

  const [showForm, setShowForm] =
    useState(false);

  const [editingProjectId, setEditingProjectId] =
    useState<number | null>(null);

  const [projectName, setProjectName] =
    useState("");

  const [clientId, setClientId] =
    useState("");

  const [service, setService] =
    useState("Web Development");

  const [deadline, setDeadline] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [priority, setPriority] =
    useState<"High" | "Medium" | "Low">(
      "Medium"
    );

  const [status, setStatus] =
    useState<
      "In Progress" | "Pending" | "Completed"
    >("Pending");

  /* =========================================
     LOAD PROJECTS
  ========================================= */

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/projects"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load projects"
          );
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error(
          "LOAD PROJECTS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  /* =========================================
     LOAD CLIENTS
  ========================================= */

  useEffect(() => {
    async function loadClients() {
      try {
        setClientsLoading(true);

        const response = await fetch(
          "/api/clients"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load clients"
          );
        }

        const data = await response.json();

        setClients(data);
      } catch (error) {
        console.error(
          "LOAD CLIENTS ERROR:",
          error
        );
      } finally {
        setClientsLoading(false);
      }
    }

    loadClients();
  }, []);

  /* =========================================
     RESET FORM
  ========================================= */

  function resetForm() {
    setProjectName("");

    setClientId("");

    setService("Web Development");

    setDeadline("");

    setBudget("");

    setPriority("Medium");

    setStatus("Pending");

    setEditingProjectId(null);
  }

  /* =========================================
     OPEN CREATE FORM
  ========================================= */

  function openCreateForm() {
    resetForm();

    setShowForm(true);
  }

  /* =========================================
     EDIT PROJECT
  ========================================= */

  function editProject(project: Project) {
    setEditingProjectId(project.id);

    setProjectName(project.name);

    /*
      Use the new client_id.
    */

    setClientId(
      project.client_id
        ? String(project.client_id)
        : ""
    );

    setService(project.service);

    setDeadline(
      project.deadline
        ? project.deadline.substring(0, 10)
        : ""
    );

    setBudget(
      String(project.budget).replace("$", "")
    );

    setPriority(project.priority);

    setStatus(project.status);

    setShowForm(true);
  }

  /* =========================================
     CREATE / UPDATE PROJECT
  ========================================= */

  async function saveProject(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (
      !projectName ||
      !clientId ||
      !deadline ||
      !budget
    ) {
      alert(
        "Please complete all required fields."
      );

      return;
    }

    try {
      const isEditing =
        editingProjectId !== null;

      const response = await fetch(
        "/api/projects",
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
              id: editingProjectId,
            }),

            name: projectName,

            client_id: Number(clientId),

            service,

            deadline,

            budget: Number(budget),

            priority,

            status,
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

      /* =====================================
         UPDATE
      ===================================== */

      if (isEditing) {
        setProjects(
          (currentProjects) =>
            currentProjects.map(
              (project) =>
                project.id ===
                editingProjectId
                  ? data
                  : project
            )
        );
      }

      /* =====================================
         CREATE
      ===================================== */

      else {
        setProjects(
          (currentProjects) => [
            data,
            ...currentProjects,
          ]
        );
      }

      resetForm();

      setShowForm(false);
    } catch (error) {
      console.error(
        "SAVE PROJECT ERROR:",
        error
      );

      alert(
        "Something went wrong while saving the project."
      );
    }
  }

  /* =========================================
     DELETE PROJECT
  ========================================= */

  async function deleteProject(
    projectId: number
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        "/api/projects",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: projectId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to delete project."
        );

        return;
      }

      setProjects(
        (currentProjects) =>
          currentProjects.filter(
            (project) =>
              project.id !== projectId
          )
      );
    } catch (error) {
      console.error(
        "DELETE PROJECT ERROR:",
        error
      );

      alert(
        "Something went wrong while deleting the project."
      );
    }
  }

  /* =========================================
     SEARCH
  ========================================= */

  const filteredProjects =
    projects.filter((project) => {
      const clientName =
        project.client_name ||
        project.client ||
        "";

      return `${project.name} ${clientName} ${project.service}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });

  /* =========================================
     PAGE
  ========================================= */

  return (
    <div className="projects-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="projects-header">

        <div>

          <p className="admin-header-small">
            WORK MANAGEMENT
          </p>

          <h1>
            Projects
          </h1>

          <p>
            Manage all SkyMark projects
            and client work.
          </p>

        </div>

        <button
          className="new-project-button"
          onClick={openCreateForm}
        >
          + New Project
        </button>

      </div>


      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (

        <div className="project-form-container">

          <div className="project-form-header">

            <div>

              <p className="admin-header-small">
                PROJECT MANAGEMENT
              </p>

              <h2>
                {editingProjectId
                  ? "Edit Project"
                  : "Create New Project"}
              </h2>

            </div>

            <button
              type="button"
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
            onSubmit={saveProject}
          >

            <div className="form-grid">

              {/* PROJECT NAME */}

              <div className="form-group">

                <label>
                  Project Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Business Website"
                  value={projectName}
                  onChange={(event) =>
                    setProjectName(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* CLIENT */}

              <div className="form-group">

                <label>
                  Client
                </label>

                <select
                  value={clientId}
                  onChange={(event) =>
                    setClientId(
                      event.target.value
                    )
                  }
                  disabled={clientsLoading}
                >

                  <option value="">
                    {clientsLoading
                      ? "Loading clients..."
                      : "Select a client"}
                  </option>

                  {clients.map(
                    (client) => (

                      <option
                        key={client.id}
                        value={client.id}
                      >
                        {client.name}
                        {client.company
                          ? ` - ${client.company}`
                          : ""}
                      </option>

                    )
                  )}

                </select>

                {!clientsLoading &&
                  clients.length === 0 && (
                    <small>
                      No clients available.
                      Create a client first.
                    </small>
                  )}

              </div>


              {/* SERVICE */}

              <div className="form-group">

                <label>
                  Service
                </label>

                <select
                  value={service}
                  onChange={(event) =>
                    setService(
                      event.target.value
                    )
                  }
                >

                  <option>
                    Web Development
                  </option>

                  <option>
                    Video Production
                  </option>

                  <option>
                    Graphic Design
                  </option>

                  <option>
                    Social Media
                  </option>

                  <option>
                    Branding
                  </option>

                  <option>
                    Photography
                  </option>

                </select>

              </div>


              {/* DEADLINE */}

              <div className="form-group">

                <label>
                  Deadline
                </label>

                <input
                  type="date"
                  value={deadline}
                  onChange={(event) =>
                    setDeadline(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* BUDGET */}

              <div className="form-group">

                <label>
                  Budget
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1500"
                  value={budget}
                  onChange={(event) =>
                    setBudget(
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
                        | "In Progress"
                        | "Pending"
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

            </div>


            {/* FORM BUTTONS */}

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
                {editingProjectId
                  ? "Update Project"
                  : "Create Project"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="projects-toolbar">

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

        <select defaultValue="all">

          <option value="all">
            All Status
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="completed">
            Completed
          </option>

        </select>


        <select defaultValue="all">

          <option value="all">
            All Services
          </option>

          <option value="web">
            Web Development
          </option>

          <option value="video">
            Video Production
          </option>

          <option value="design">
            Graphic Design
          </option>

          <option value="social">
            Social Media
          </option>

        </select>

      </div>


      {/* =====================================
          PROJECT TABLE
      ===================================== */}

      <div className="projects-table">

        <div className="projects-table-header">

          <span>
            PROJECT
          </span>

          <span>
            CLIENT
          </span>

          <span>
            SERVICE
          </span>

          <span>
            DEADLINE
          </span>

          <span>
            BUDGET
          </span>

          <span>
            PRIORITY
          </span>

          <span>
            STATUS
          </span>

          <span>
            ACTIONS
          </span>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="no-projects">
            Loading projects...
          </div>

        )}


        {/* PROJECTS */}

        {!loading &&
          filteredProjects.map(
            (project) => {

              const clientName =
                project.client_name ||
                project.client ||
                "No client";

              return (

                <div
                  className="project-row"
                  key={project.id}
                >

                  {/* PROJECT */}

                  <div className="project-name">

                    <div className="project-icon">
                      ▣
                    </div>

                    <strong>
                      {project.name}
                    </strong>

                  </div>


                  {/* CLIENT */}

                  <span>
                    {clientName}
                  </span>


                  {/* SERVICE */}

                  <span>
                    {project.service}
                  </span>


                  {/* DEADLINE */}

                  <span>
                    {project.deadline
                      ? project.deadline.substring(
                          0,
                          10
                        )
                      : "-"}
                  </span>


                  {/* BUDGET */}

                  <span>
                    $
                    {Number(
                      project.budget
                    ).toLocaleString()}
                  </span>


                  {/* PRIORITY */}

                  <span>

                    <span
                      className={`project-priority ${project.priority.toLowerCase()}`}
                    >
                      {project.priority}
                    </span>

                  </span>


                  {/* STATUS */}

                  <span>

                    <span
                      className={`project-status ${project.status
                        .toLowerCase()
                        .replace(
                          " ",
                          "-"
                        )}`}
                    >
                      {project.status}
                    </span>

                  </span>


                  {/* ACTIONS */}

                  <div className="project-actions">

                    <button
                      className="edit-project-button"
                      onClick={() =>
                        editProject(
                          project
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-project-button"
                      onClick={() =>
                        deleteProject(
                          project.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              );
            }
          )}


        {/* NO PROJECTS */}

        {!loading &&
          filteredProjects.length ===
            0 && (

            <div className="no-projects">
              No projects found.
            </div>

          )}

      </div>

    </div>
  );
}