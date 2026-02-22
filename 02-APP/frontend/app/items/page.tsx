import Link from "next/link";
import DataTable from "@/components/DataTable";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  let items = [];
  try {
    items = await api.listItems(searchParams);
  } catch {
    // backend not running
  }

  return (
    <>
      <div className="page-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1>Items</h1>
          <p>{items.length} record{items.length !== 1 ? "s" : ""} found</p>
        </div>
        <Link href="/items/new" className="btn btn-primary">+ New item</Link>
      </div>

      {/* Filter bar */}
      <form method="GET" style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search by title…"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            borderRadius: 6,
            padding: "0.45rem 0.75rem",
            fontSize: "0.875rem",
            outline: "none",
            width: 240,
          }}
        />
        <select
          name="status"
          defaultValue={searchParams.status ?? ""}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            borderRadius: 6,
            padding: "0.45rem 0.75rem",
            fontSize: "0.875rem",
            outline: "none",
          }}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit" className="btn btn-ghost">Filter</button>
        {(searchParams.q || searchParams.status) && (
          <Link href="/items" className="btn btn-ghost">Clear</Link>
        )}
      </form>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
      }}>
        <DataTable items={items} />
      </div>
    </>
  );
}
