"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  client_name?: string | null;
  client?: string | null;
  service: string;
  deadline: string;
  budget: string | number;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
};

type Client = {
  id: number;
  name: string;
  company?: string | null;
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Date and time are initialized after hydration
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Load dashboard data
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const [projectsResponse, clientsResponse] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/clients"),
        ]);

        if (!projectsResponse.ok) {
          throw new Error("Failed to load projects");
        }

        if (!clientsResponse.ok) {
          throw new Error("Failed to load clients");
        }

        const projectsData = await projectsResponse.json();
        const clientsData = await clientsResponse.json();

        setProjects(projectsData);
        setClients(clientsData);
      } catch (error) {
        console.error("DASHBOARD ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Project statistics
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const pendingProjects = projects.filter(
    (project) => project.status === "Pending"
  ).length;

  const totalClients = clients.length;

  const totalRevenue = projects.reduce(
    (total, project) => total + Number(project.budget || 0),
    0
  );

  // Recent projects
  const recentProjects = [...projects].slice(0, 5);

  // Date
  const formattedDate = currentTime
    ? currentTime.toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Loading date...";

  // Time
  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="dashboard-header-center">
          <p className="admin-header-small">SKYMARK ADMIN</p>

          <h1>Dashboard</h1>

          <p className="dashboard-manager">
            Managed by <strong>Shukrani Nkulu Kayumba</strong>
          </p>
        </div>

        {/* DATE & TIME */}
        <div className="dashboard-date">
          <span>{formattedDate}</span>
          <strong>{formattedTime}</strong>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="dashboard-loading">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* STATISTICS */}
          <section className="dashboard-stats">

            <div className="dashboard-card">
              <div className="dashboard-card-top">
                <span>Total Projects</span>
                <div className="dashboard-card-icon">📁</div>
              </div>
              <strong>{totalProjects}</strong>
              <p>All projects</p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-top">
                <span>Active Projects</span>
                <div className="dashboard-card-icon">⚡</div>
              </div>
              <strong>{activeProjects}</strong>
              <p>Currently in progress</p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-top">
                <span>Clients</span>
                <div className="dashboard-card-icon">👥</div>
              </div>
              <strong>{totalClients}</strong>
              <p>Registered clients</p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-top">
                <span>Project Value</span>
                <div className="dashboard-card-icon">💰</div>
              </div>
              <strong>
                R {totalRevenue.toLocaleString("en-ZA")}
              </strong>
              <p>Total project budgets</p>
            </div>

          </section>

          {/* MAIN GRID */}
          <div className="dashboard-main-grid">

            {/* TODAY'S FOCUS */}
            <section className="dashboard-section">
              <div className="section-header">
                <div>
                  <p className="admin-header-small">WORK MANAGEMENT</p>
                  <h2>Today&apos;s Focus</h2>
                </div>
                <span className="focus-badge">Today</span>
              </div>

              <div className="focus-list">

                <div className="focus-item">
                  <div className="focus-icon">🎬</div>
                  <div>
                    <strong>Video Production</strong>
                    <p>Create and edit client videos</p>
                  </div>
                </div>

                <div className="focus-item">
                  <div className="focus-icon">📱</div>
                  <div>
                    <strong>Content Creation</strong>
                    <p>Prepare social media content</p>
                  </div>
                </div>

                <div className="focus-item">
                  <div className="focus-icon">💻</div>
                  <div>
                    <strong>Web Development</strong>
                    <p>Build and update client websites</p>
                  </div>
                </div>

                <div className="focus-item">
                  <div className="focus-icon">🎨</div>
                  <div>
                    <strong>Design & Branding</strong>
                    <p>Work on branding and graphic design</p>
                  </div>
                </div>

              </div>
            </section>

            {/* PROJECT STATUS */}
            <section className="dashboard-section">
              <div className="section-header">
                <div>
                  <p className="admin-header-small">OVERVIEW</p>
                  <h2>Project Status</h2>
                </div>
              </div>

              <div className="status-overview">

                <div className="status-overview-item">
                  <span className="status-dot pending-dot"></span>
                  <span>Pending</span>
                  <strong>{pendingProjects}</strong>
                </div>

                <div className="status-overview-item">
                  <span className="status-dot progress-dot"></span>
                  <span>In Progress</span>
                  <strong>{activeProjects}</strong>
                </div>

                <div className="status-overview-item">
                  <span className="status-dot completed-dot"></span>
                  <span>Completed</span>
                  <strong>{completedProjects}</strong>
                </div>

              </div>
            </section>

          </div>

          {/* RECENT PROJECTS */}
          <section className="dashboard-section recent-projects">
            <div className="section-header">
              <div>
                <p className="admin-header-small">WORK</p>
                <h2>Recent Projects</h2>
              </div>

              <Link href="/admin/projects" className="view-all-link">
                View all →
              </Link>
            </div>

            <div className="recent-projects-table">

              <div className="recent-table-header">
                <span>PROJECT</span>
                <span>CLIENT</span>
                <span>SERVICE</span>
                <span>BUDGET</span>
                <span>STATUS</span>
              </div>

              {recentProjects.length === 0 ? (
                <div className="empty-dashboard">
                  <span>📁</span>
                  <p>No projects yet.</p>
                  <Link href="/admin/projects">
                    Create your first project
                  </Link>
                </div>
              ) : (
                recentProjects.map((project) => {
                  const clientName =
                    project.client_name ||
                    project.client ||
                    "No client";

                  return (
                    <div
                      className="recent-project-row"
                      key={project.id}
                    >
                      <div className="recent-project-name">
                        <div className="recent-project-icon">▣</div>
                        <strong>{project.name}</strong>
                      </div>

                      <span>{clientName}</span>
                      <span>{project.service}</span>

                      <span>
                        R {Number(project.budget || 0).toLocaleString("en-ZA")}
                      </span>

                      <span>
                        <span
                          className={`project-status ${project.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {project.status}
                        </span>
                      </span>
                    </div>
                  );
                })
              )}

            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-section">
            <div className="section-header">
              <div>
                <p className="admin-header-small">SHORTCUTS</p>
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">

              <Link href="/admin/projects" className="quick-action">
                <span>📁</span>
                <div>
                  <strong>New Project</strong>
                  <p>Create a new project</p>
                </div>
              </Link>

              <Link href="/admin/clients" className="quick-action">
                <span>👤</span>
                <div>
                  <strong>Manage Clients</strong>
                  <p>Add or update clients</p>
                </div>
              </Link>

              <Link href="/admin/tasks" className="quick-action">
                <span>✓</span>
                <div>
                  <strong>Manage Tasks</strong>
                  <p>Organize today&apos;s work</p>
                </div>
              </Link>

            </div>
          </section>
        </>
      )}
    </div>
  );
}