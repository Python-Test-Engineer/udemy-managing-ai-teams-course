import Link from "next/link";
import StatCard from "@/components/StatCard";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let stats = { total: 0, active: 0, archived: 0 };
  try {
    stats = await api.getStats();
  } catch {
    // backend not running — show zeros
  }

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of all items in the database.</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.25rem",
        marginBottom: "2.5rem",
      }}>
        <StatCard label="Total" value={stats.total} accent />
        <StatCard label="Active" value={stats.active} />
        <StatCard label="Archived" value={stats.archived} />
      </div>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.75rem",
      }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>Quick actions</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Manage your records from the Items section.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
          <Link href="/items" className="btn btn-ghost">View all items</Link>
          <Link href="/items/new" className="btn btn-primary">+ New item</Link>
        </div>
      </div>
    </>
  );
}
