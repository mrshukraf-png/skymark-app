import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { demoProjects, demoTasks } from "@/lib/demo-data";

export async function GET() {
  try {
    if (pool) {
      const projectStats = await pool.query(`
        SELECT
          COUNT(*)::int AS total_projects,
          COUNT(*) FILTER (WHERE status = 'In Progress')::int AS in_progress,
          COUNT(*) FILTER (WHERE status = 'Completed')::int AS completed,
          COUNT(*) FILTER (WHERE status = 'Pending')::int AS pending
        FROM projects
      `);

      const taskStats = await pool.query(`
        SELECT
          COUNT(*)::int AS total_tasks,
          COUNT(*) FILTER (WHERE status = 'In Progress')::int AS in_progress,
          COUNT(*) FILTER (WHERE status = 'Completed')::int AS completed,
          COUNT(*) FILTER (WHERE status = 'Pending')::int AS pending
        FROM tasks
      `);

      const recentProjects = await pool.query(`
        SELECT
          id,
          name,
          client,
          service,
          deadline,
          budget,
          priority,
          status,
          created_at
        FROM projects
        ORDER BY created_at DESC
        LIMIT 5
      `);

      const recentTasks = await pool.query(`
        SELECT
          tasks.id,
          tasks.title,
          tasks.category,
          tasks.status,
          tasks.priority,
          tasks.due_date,
          projects.name AS project_name
        FROM tasks
        LEFT JOIN projects ON tasks.project_id = projects.id
        ORDER BY tasks.created_at DESC
        LIMIT 5
      `);

      const todayTasks = await pool.query(`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE status = 'Completed')::int AS completed
        FROM tasks
        WHERE due_date = CURRENT_DATE
      `);

      return NextResponse.json({
        projects: projectStats.rows[0],
        tasks: taskStats.rows[0],
        recentProjects: recentProjects.rows,
        recentTasks: recentTasks.rows,
        today: todayTasks.rows[0],
      });
    }

    const today = new Date().toISOString().slice(0, 10);

    const projectSummary = {
      total_projects: demoProjects.length,
      in_progress: demoProjects.filter((project) => project.status === "In Progress").length,
      completed: demoProjects.filter((project) => project.status === "Completed").length,
      pending: demoProjects.filter((project) => project.status === "Pending").length,
    };

    const taskSummary = {
      total_tasks: demoTasks.length,
      in_progress: demoTasks.filter((task) => task.status === "In Progress").length,
      completed: demoTasks.filter((task) => task.status === "Completed").length,
      pending: demoTasks.filter((task) => task.status === "Pending").length,
    };

    const recentProjectRows = [...demoProjects].slice(0, 5).map((project) => ({
      id: project.id,
      name: project.name,
      client: project.client,
      service: project.service,
      deadline: project.deadline,
      budget: project.budget,
      priority: project.priority,
      status: project.status,
      created_at: project.created_at,
    }));

    const recentTaskRows = [...demoTasks].slice(0, 5).map((task) => ({
      id: task.id,
      title: task.title,
      category: task.category,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date,
      project_name: task.project_name ?? null,
    }));

    const todayTaskSummary = {
      total: demoTasks.filter((task) => task.due_date === today).length,
      completed: demoTasks.filter(
        (task) => task.due_date === today && task.status === "Completed"
      ).length,
    };

    return NextResponse.json({
      projects: projectSummary,
      tasks: taskSummary,
      recentProjects: recentProjectRows,
      recentTasks: recentTaskRows,
      today: todayTaskSummary,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}