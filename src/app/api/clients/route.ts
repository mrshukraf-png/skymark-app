import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { demoClients, nextClientId } from "@/lib/demo-data";

export async function GET() {
  try {
    if (pool) {
      const result = await pool.query(`
        SELECT
          id,
          name,
          email,
          phone,
          company,
          service,
          status,
          notes,
          created_at
        FROM clients
        ORDER BY created_at DESC
      `);

      return NextResponse.json(result.rows);
    }

    return NextResponse.json([...demoClients].sort((a, b) => Number(b.id) - Number(a.id)));
  } catch (error) {
    console.error("GET CLIENTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load clients",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      service,
      status,
      notes,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        {
          error: "Client name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (pool) {
      try {
        const result = await pool.query(
          `
          INSERT INTO clients
          (
            name,
            email,
            phone,
            company,
            service,
            status,
            notes
          )
          VALUES
          (
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
            name.trim(),
            email?.trim() || null,
            phone?.trim() || null,
            company?.trim() || null,
            service?.trim() || null,
            status || "Active",
            notes?.trim() || null,
          ]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
      } catch (error) {
        console.error("CREATE CLIENT DB ERROR:", error);
      }
    }

    const createdClient = {
      id: nextClientId(),
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      service: service?.trim() || null,
      status: status || "Active",
      notes: notes?.trim() || null,
      created_at: new Date().toISOString(),
    };

    demoClients.unshift(createdClient);

    return NextResponse.json(createdClient, { status: 201 });
  } catch (error) {
    console.error("CREATE CLIENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create client",
      },
      {
        status: 500,
      }
    );
  }
}