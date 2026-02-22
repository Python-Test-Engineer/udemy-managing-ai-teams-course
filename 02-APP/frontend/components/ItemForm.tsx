"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, Item, ItemPayload } from "@/lib/api";

interface Props {
  item?: Item;
}

export default function ItemForm({ item }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [status, setStatus] = useState<"active" | "archived">(item?.status ?? "active");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required."); return; }
    setSaving(true);
    setError("");
    try {
      const payload: ItemPayload = {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
      };
      if (item) {
        await api.updateItem(item.id, payload);
      } else {
        await api.createItem(payload);
      }
      // Hard navigate so the server re-fetches fresh data
      window.location.href = "/items";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
      {error && (
        <div style={{
          background: "#3f1f1f",
          border: "1px solid #7f2020",
          color: "#f87171",
          borderRadius: 6,
          padding: "0.65rem 0.9rem",
          marginBottom: "1.25rem",
          fontSize: "0.875rem",
        }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          maxLength={120}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Item title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "active" | "archived")}
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving…" : item ? "Save changes" : "Create item"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
