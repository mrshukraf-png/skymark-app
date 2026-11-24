import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { demoProjects, demoTasks, nextTaskId } from "@/lib/demo-data";

export async function GET() {
  try {
    if (pool) {
      const result = await pool.query(`
        SELECT
          tasks.*,
          projects.name AS project_name
        FROM tasks
        LEFT JOIN projects ON tasks.project_id = projects.id
        ORDER BY tasks.created_at DESC
      `);

      return NextResponse.json(result.rows);
    }

    return NextResponse.json(
      [...demoTasks]
        .sort((a, b) => Number(b.id) - Number(a.id))
        .map((task) => ({
          ...task,
          project_name:
            task.project_name ??
            (demoProjects.find((project) => project.id === task.project_id)?.name || null),
        }))
    );
  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, status, priority, due_date, project_id } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required." },
        { status: 400 }
      );
    }

    if (pool) {
      try {
        const result = await pool.query(
          `
          INSERT INTO tasks (
            title,
            description,
            category,
            status,
            priority,
            due_date,
            project_id
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )
          RETURNING *
          `,
          [
            title,
            description || null,
            category,
            status || "Pending",
            priority || "Medium",
            due_date || null,
            project_id || null,
          ]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
      } catch (error) {
        console.error("CREATE TASK DB ERROR:", error);
      }
    }

    const createdTask = {
      id: nextTaskId(),
      title,
      description: description || null,
      category,
      status: status || "Pending",
      priority: priority || "Medium",
      due_date: due_date || null,
      project_id: project_id || null,
      project_name:
        demoProjects.find((project) => project.id === Number(project_id))?.name || null,
      created_at: new Date().toISOString(),
    };

    demoTasks.unshift(createdTask);

    return NextResponse.json(createdTask, { status: 201 });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, category, status, priority, due_date, project_id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required." },
        { status: 400 }
      );
    }

    if (pool) {
      try {
        const result = await pool.query(
          `
          UPDATE tasks
          SET
            title = $1,
            description = $2,
            category = $3,
            status = $4,
            priority = $5,
            due_date = $6,
            project_id = $7,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $8
          RETURNING *
          `,
          [
            title,
            description || null,
            category,
            status,
            priority,
            due_date || null,
            project_id || null,
            id,
          ]
        );

        if (result.rows.length === 0) {
          return NextResponse.json(
            { error: "Task not found." },
            { status: 404 }
          );
        }

        return NextResponse.json(result.rows[0]);
      } catch (error) {
        console.error("UPDATE TASK DB ERROR:", error);
      }
    }

    const taskIndex = demoTasks.findIndex((task) => task.id === Number(id));

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: "Task not found." },
        { status: 404 }
      );
    }

    demoTasks[taskIndex] = {
      ...demoTasks[taskIndex],
      title,
      description: description || null,
      category,
      status,
      priority,
      due_date: due_date || null,
      project_id: project_id || null,
      project_name:
        demoProjects.find((project) => project.id === Number(project_id))?.name || null,
    };

    return NextResponse.json(demoTasks[taskIndex]);
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required." },
        { status: 400 }
      );
    }

    if (pool) {
      try {
        const result = await pool.query(
          `DELETE FROM tasks WHERE id = $1 RETURNING *`,
          [id]
        );

        if (result.rows.length === 0) {
          return NextResponse.json(
            { error: "Task not found." },
            { status: 404 }
          );
        }

        return NextResponse.json({
          message: "Task deleted successfully.",
          task: result.rows[0],
        });
      } catch (error) {
        console.error("DELETE TASK DB ERROR:", error);
      }
    }

    const taskIndex = demoTasks.findIndex((task) => task.id === Number(id));

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: "Task not found." },
        { status: 404 }
      );
    }

    const [removedTask] = demoTasks.splice(taskIndex, 1);

    return NextResponse.json({
      message: "Task deleted successfully.",
      task: removedTask,
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
