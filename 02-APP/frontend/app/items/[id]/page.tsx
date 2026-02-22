import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  let item;
  try {
    item = await api.getItem(Number(params.id));
  } catch {
    notFound();
  }
  if (!item) notFound();

  return (
    <>
      <div className="page-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1>{item.title}</h1>
          <p>Item #{item.id}</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href={`/items/${item.id}/edit`} className="btn btn-ghost">Edit</Link>
          <Link href="/items" className="btn btn-ghost">← Back</Link>
        </div>
      </div>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "2rem",
        maxWidth: 620,
      }}>
        <dl style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1rem 1.5rem" }}>
          <dt style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500, paddingTop: 2 }}>Status</dt>
          <dd>
            <span className={`badge badge-${item.status}`}>{item.status}</span>
          </dd>

          <dt style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500, paddingTop: 2 }}>Description</dt>
          <dd style={{ color: item.description ? "var(--text-primary)" : "var(--text-muted)", lineHeight: 1.6 }}>
            {item.description || "—"}
          </dd>

          <dt style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>Created</dt>
          <dd style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            {new Date(item.created_at).toLocaleString()}
          </dd>
        </dl>
      </div>
    </>
  );
}
