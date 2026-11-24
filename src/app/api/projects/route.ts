import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { demoClients, demoProjects, nextProjectId } from "@/lib/demo-data";

export async function GET() {
  try {
    if (pool) {
      const result = await pool.query(`
        SELECT
          p.id,
          p.name,
          p.client_id,
          c.name AS client,
          p.service,
          p.deadline,
          p.budget,
          p.priority,
          p.status,
          p.created_at
        FROM projects p
        LEFT JOIN clients c ON p.client_id = c.id
        ORDER BY p.created_at DESC
      `);

      return NextResponse.json(result.rows);
    }

    return NextResponse.json(
      [...demoProjects]
        .sort((a, b) => Number(b.id) - Number(a.id))
        .map((project) => ({
          ...project,
          client:
            demoClients.find((client) => client.id === project.client_id)?.name ||
            project.client,
        }))
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load projects";

    console.error("GET PROJECTS ERROR:", errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, client_id, service, deadline, budget, priority, status } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    if (client_id === undefined || client_id === null || client_id === "") {
      return NextResponse.json({ error: "Client is required" }, { status: 400 });
    }

    const clientId = Number(client_id);
    if (!Number.isInteger(clientId)) {
      return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
    }

    if (!deadline) {
      return NextResponse.json({ error: "Deadline is required" }, { status: 400 });
    }

    if (budget === undefined || budget === null || budget === "") {
      return NextResponse.json({ error: "Budget is required" }, { status: 400 });
    }

    const numericBudget = Number(budget);
    if (!Number.isFinite(numericBudget) || numericBudget < 0) {
      return NextResponse.json({ error: "Budget must be a valid number" }, { status: 400 });
    }

    if (pool) {
      try {
        const clientCheck = await pool.query(
          "SELECT id, name FROM clients WHERE id = $1",
          [clientId]
        );

        if (clientCheck.rows.length === 0) {
          return NextResponse.json(
            { error: `Client with ID ${clientId} does not exist` },
            { status: 400 }
          );
        }

        const result = await pool.query(
          `
            INSERT INTO projects
              (name, client, client_id, service, deadline, budget, priority, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
          `,
          [
            name.trim(),
            clientCheck.rows[0].name,
            clientId,
            typeof service === "string" && service.trim() ? service.trim() : "Web Development",
            deadline,
            numericBudget,
            priority || "Medium",
            status || "Pending",
          ]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create project";
        console.error("CREATE PROJECT DB ERROR:", message);
        return NextResponse.json(
          { error: "The project could not be saved to the database.", details: message },
          { status: 500 }
        );
      }
    }

    const createdProject = {
      id: nextProjectId(),
      name: name.trim(),
      client_id: clientId,
      client: demoClients.find((client) => client.id === clientId)?.name || null,
      service: typeof service === "string" && service.trim() ? service.trim() : "Web Development",
      deadline,
      budget: numericBudget,
      priority: priority || "Medium",
      status: status || "Pending",
      created_at: new Date().toISOString(),
    };

    demoProjects.unshift(createdProject);
    return NextResponse.json(createdProject, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    console.error("CREATE PROJECT ERROR:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, client_id, service, deadline, budget, priority, status } = body;

    if (id === undefined || id === null || id === "") {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }
    if (client_id === undefined || client_id === null || client_id === "") {
      return NextResponse.json({ error: "Client is required" }, { status: 400 });
    }

    const clientId = Number(client_id);
    if (!Number.isInteger(clientId)) {
      return NextResponse.json({ error: "Invalid client ID" }, { status: 400 });
    }
    if (!deadline) {
      return NextResponse.json({ error: "Deadline is required" }, { status: 400 });
    }
    if (budget === undefined || budget === null || budget === "") {
      return NextResponse.json({ error: "Budget is required" }, { status: 400 });
    }

    const numericBudget = Number(budget);
    if (!Number.isFinite(numericBudget) || numericBudget < 0) {
      return NextResponse.json({ error: "Budget must be a valid number" }, { status: 400 });
    }

    if (pool) {
      try {
        const clientCheck = await pool.query(
          "SELECT id, name FROM clients WHERE id = $1",
          [clientId]
        );

        if (clientCheck.rows.length === 0) {
          return NextResponse.json(
            { error: `Client with ID ${clientId} does not exist` },
            { status: 400 }
          );
        }

        const result = await pool.query(
          `
            UPDATE projects
            SET name = $1,
                client = $2,
                client_id = $3,
                service = $4,
                deadline = $5,
                budget = $6,
                priority = $7,
                status = $8
            WHERE id = $9
            RETURNING *
          `,
          [
            name.trim(),
            clientCheck.rows[0].name,
            clientId,
            typeof service === "string" && service.trim() ? service.trim() : "Web Development",
            deadline,
            numericBudget,
            priority || "Medium",
            status || "Pending",
            id,
          ]
        );

        if (result.rows.length === 0) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update project";
        console.error("UPDATE PROJECT DB ERROR:", message);
        return NextResponse.json(
          { error: "The project could not be updated in the database.", details: message },
          { status: 500 }
        );
      }
    }

    const projectIndex = demoProjects.findIndex((project) => project.id === Number(id));
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    demoProjects[projectIndex] = {
      ...demoProjects[projectIndex],
      name: name.trim(),
      client_id: clientId,
      client: demoClients.find((client) => client.id === clientId)?.name || null,
      service: typeof service === "string" && service.trim() ? service.trim() : "Web Development",
      deadline,
      budget: numericBudget,
      priority: priority || "Medium",
      status: status || "Pending",
    };

    return NextResponse.json(demoProjects[projectIndex]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    console.error("UPDATE PROJECT ERROR:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (id === undefined || id === null || id === "") {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    if (pool) {
      try {
        const result = await pool.query(
          "DELETE FROM projects WHERE id = $1 RETURNING *",
          [id]
        );

        if (result.rows.length === 0) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
          message: "Project deleted successfully",
          project: result.rows[0],
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to delete project";
        console.error("DELETE PROJECT DB ERROR:", message);
        return NextResponse.json(
          { error: "The project could not be deleted from the database.", details: message },
          { status: 500 }
        );
      }
    }

    const projectIndex = demoProjects.findIndex((project) => project.id === Number(id));
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const [removedProject] = demoProjects.splice(projectIndex, 1);
    return NextResponse.json({
      message: "Project deleted successfully",
      project: removedProject,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete project";
    console.error("DELETE PROJECT ERROR:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
