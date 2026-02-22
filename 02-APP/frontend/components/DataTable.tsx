"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, Item } from "@/lib/api";

interface Props {
  items: Item[];
}

export default function DataTable({ items }: Props) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await api.deleteItem(id);
    router.refresh();
  }

  if (items.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "4rem 0",
        color: "var(--text-muted)",
        fontSize: "0.9rem",
      }}>
        No items yet.{" "}
        <Link href="/items/new" style={{ color: "var(--accent)" }}>
          Create one
        </Link>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "0.875rem",
      }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["ID", "Title", "Status", "Created", ""].map((h) => (
              <th key={h} style={{
                textAlign: "left",
                padding: "0.6rem 1rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{
              borderBottom: "1px solid var(--divider)",
              transition: "background 0.12s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "0.75rem 1rem", color: "var(--text-muted)" }}>
                #{item.id}
              </td>
              <td style={{ padding: "0.75rem 1rem", fontWeight: 500 }}>
                <Link href={`/items/${item.id}`} style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </Link>
              </td>
              <td style={{ padding: "0.75rem 1rem" }}>
                <span className={`badge badge-${item.status}`}>{item.status}</span>
              </td>
              <td style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)" }}>
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td style={{ padding: "0.75rem 1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link href={`/items/${item.id}/edit`} className="btn btn-ghost" style={{ padding: "0.3rem 0.65rem" }}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger"
                    style={{ padding: "0.3rem 0.65rem" }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
