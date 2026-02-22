interface StatCardProps {
  label: string;
  value: number;
  accent?: boolean;
}

export default function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "10px",
      padding: "1.5rem",
      boxShadow: "var(--shadow)",
    }}>
      <div style={{
        fontSize: "2.25rem",
        fontWeight: 700,
        color: accent ? "var(--accent)" : "var(--text-primary)",
        lineHeight: 1,
        marginBottom: "0.5rem",
      }}>
        {value}
      </div>
      <div style={{
        fontSize: "0.875rem",
        color: "var(--text-secondary)",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}>
        {label}
      </div>
    </div>
  );
}
