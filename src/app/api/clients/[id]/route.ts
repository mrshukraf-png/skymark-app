import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { demoClients } from "@/lib/demo-data";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, email, phone, company, service, status, notes } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Client name is required" },
        { status: 400 }
      );
    }

    if (pool) {
      try {
        const result = await pool.query(
          `
          UPDATE clients
          SET
            name = $1,
            email = $2,
            phone = $3,
            company = $4,
            service = $5,
            status = $6,
            notes = $7
          WHERE id = $8
          RETURNING *
          `,
          [
            name.trim(),
            email?.trim() || null,
            phone?.trim() || null,
            company?.trim() || null,
            service?.trim() || null,
            status || "Active",
            notes?.trim() || null,
            id,
          ]
        );

        if (result.rows.length === 0) {
          return NextResponse.json(
            { error: "Client not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(result.rows[0]);
      } catch (error) {
        console.error("UPDATE CLIENT DB ERROR:", error);
      }
    }

    const clientIndex = demoClients.findIndex((client) => client.id === Number(id));

    if (clientIndex === -1) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    demoClients[clientIndex] = {
      ...demoClients[clientIndex],
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      service: service?.trim() || null,
      status: status || "Active",
      notes: notes?.trim() || null,
    };

    return NextResponse.json(demoClients[clientIndex]);
  } catch (error) {
    console.error("UPDATE CLIENT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (pool) {
      try {
        const result = await pool.query(
          `DELETE FROM clients WHERE id = $1 RETURNING *`,
          [id]
        );

        if (result.rows.length === 0) {
          return NextResponse.json(
            { error: "Client not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({ message: "Client deleted successfully" });
      } catch (error) {
        console.error("DELETE CLIENT DB ERROR:", error);
      }
    }

    const clientIndex = demoClients.findIndex((client) => client.id === Number(id));

    if (clientIndex === -1) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    demoClients.splice(clientIndex, 1);

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("DELETE CLIENT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
