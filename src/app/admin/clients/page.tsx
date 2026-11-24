"use client";

import { useEffect, useState } from "react";

type Client = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

type ClientForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  status: string;
  notes: string;
};

const emptyForm: ClientForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  status: "Active",
  notes: "",
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<ClientForm>(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /* =========================================
     LOAD CLIENTS
  ========================================= */

  useEffect(() => {
    let isActive = true;

    async function loadClients() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/clients", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load clients"
          );
        }

        if (isActive) {
          setClients(data);
        }
      } catch (error) {
        console.error("LOAD CLIENTS ERROR:", error);

        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load clients"
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadClients();

    return () => {
      isActive = false;
    };
  }, []);


  /* =========================================
     FORM CHANGE
  ========================================= */

  function handleChange(
    field: keyof ClientForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }


  /* =========================================
     OPEN CREATE
  ========================================= */

  function openCreate() {
    setEditingClient(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  }


  /* =========================================
     OPEN EDIT
  ========================================= */

  function openEdit(client: Client) {
    setEditingClient(client);

    setForm({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      service: client.service || "",
      status: client.status || "Active",
      notes: client.notes || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  }


  /* =========================================
     CREATE CLIENT
  ========================================= */

  async function createClient() {
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Client name is required.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || null,
          phone: form.phone.trim() || null,
          company: form.company.trim() || null,
          service: form.service || null,
          status: form.status || "Active",
          notes: form.notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create client"
        );
      }

      setClients((current) => [
        data,
        ...current,
      ]);

      setForm(emptyForm);
      setShowForm(false);

      setSuccess(
        "Client created successfully."
      );

    } catch (error) {
      console.error(
        "CREATE CLIENT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create client"
      );

    } finally {
      setSaving(false);
    }
  }


  /* =========================================
     UPDATE CLIENT
  ========================================= */

  async function updateClient() {
    if (!editingClient) return;

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Client name is required.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/clients/${editingClient.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim() || null,
            phone: form.phone.trim() || null,
            company: form.company.trim() || null,
            service: form.service || null,
            status: form.status || "Active",
            notes: form.notes.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update client"
        );
      }

      setClients((current) =>
        current.map((client) =>
          client.id === editingClient.id
            ? data
            : client
        )
      );

      setEditingClient(null);
      setForm(emptyForm);
      setShowForm(false);

      setSuccess(
        "Client updated successfully."
      );

    } catch (error) {
      console.error(
        "UPDATE CLIENT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update client"
      );

    } finally {
      setSaving(false);
    }
  }


  /* =========================================
     DELETE CLIENT
  ========================================= */

  async function deleteClient(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/clients/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete client"
        );
      }

      setClients((current) =>
        current.filter(
          (client) => client.id !== id
        )
      );

      setSuccess(
        "Client deleted successfully."
      );

    } catch (error) {
      console.error(
        "DELETE CLIENT ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete client"
      );
    }
  }


  /* =========================================
     CLOSE FORM
  ========================================= */

  function closeForm() {
    setShowForm(false);
    setEditingClient(null);
    setForm(emptyForm);
    setError("");
  }


  /* =========================================
     RENDER
  ========================================= */

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "100vh",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <div>
          <h1>Clients</h1>

          <p>
            Manage your SkyMark clients.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
        >
          + Add Client
        </button>

      </div>


      {/* MESSAGES */}

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ef4444",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}


      {/* CREATE / EDIT FORM */}

      {showForm && (
        <section
          style={{
            marginBottom: "30px",
            padding: "25px",
            border: "1px solid #333",
            borderRadius: "12px",
          }}
        >

          <h2>
            {editingClient
              ? "Edit Client"
              : "Create Client"}
          </h2>


          <div
            style={{
              display: "grid",
              gap: "15px",
              marginTop: "20px",
            }}
          >

            <input
              type="text"
              placeholder="Client name *"
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                handleChange(
                  "phone",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                handleChange(
                  "company",
                  e.target.value
                )
              }
            />

            <select
              value={form.service}
              onChange={(e) =>
                handleChange(
                  "service",
                  e.target.value
                )
              }
            >
              <option value="">
                Select service
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Digital Marketing">
                Digital Marketing
              </option>

              <option value="Video & Content">
                Video & Content
              </option>

              <option value="Branding & Design">
                Branding & Design
              </option>
            </select>


            <select
              value={form.status}
              onChange={(e) =>
                handleChange(
                  "status",
                  e.target.value
                )
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Lead">
                Lead
              </option>
            </select>


            <textarea
              placeholder="Notes"
              rows={4}
              value={form.notes}
              onChange={(e) =>
                handleChange(
                  "notes",
                  e.target.value
                )
              }
            />


            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                type="button"
                onClick={
                  editingClient
                    ? updateClient
                    : createClient
                }
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingClient
                    ? "Update Client"
                    : "Create Client"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
              >
                Cancel
              </button>

            </div>

          </div>

        </section>
      )}


      {/* CLIENT LIST */}

      <section>

        {loading ? (
          <p>Loading clients...</p>
        ) : clients.length === 0 ? (
          <p>No clients found.</p>
        ) : (

          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >

            {clients.map((client) => (

              <article
                key={client.id}
                style={{
                  padding: "20px",
                  border: "1px solid #333",
                  borderRadius: "12px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >

                  <div>

                    <h3>
                      {client.name}
                    </h3>

                    {client.company && (
                      <p>
                        {client.company}
                      </p>
                    )}

                    {client.email && (
                      <p>
                        {client.email}
                      </p>
                    )}

                    {client.phone && (
                      <p>
                        {client.phone}
                      </p>
                    )}

                    {client.service && (
                      <p>
                        Service:{" "}
                        {client.service}
                      </p>
                    )}

                    <p>
                      Status:{" "}
                      {client.status}
                    </p>

                  </div>


                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        openEdit(client)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteClient(client.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}