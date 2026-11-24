import { NextResponse } from "next/server";

import pool from "@/lib/db";
import {
  demoContactMessages,
  nextContactMessageId,
} from "@/lib/demo-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      service,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Name, email and message are required.",
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
          INSERT INTO contact_messages
          (
            name,
            email,
            company,
            service,
            message
          )
          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            $5
          )
          RETURNING *
          `,
          [name, email, company || null, service || null, message]
        );

        return NextResponse.json(
          {
            message: "Your message has been sent successfully.",
            data: result.rows[0],
          },
          {
            status: 201,
          }
        );
      } catch (error) {
        console.error("CONTACT FORM DB ERROR:", error);
      }
    }

    const savedMessage = {
      id: nextContactMessageId(),
      name: String(name),
      email: String(email),
      company: company ? String(company) : null,
      service: service ? String(service) : null,
      message: String(message),
      created_at: new Date().toISOString(),
    };

    demoContactMessages.push(savedMessage);

    return NextResponse.json(
      {
        message: "Your message has been sent successfully.",
        data: savedMessage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to send your message.",
      },
      {
        status: 500,
      }
    );
  }
}