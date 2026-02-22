"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/items", label: "Items" },
  { href: "/items/new", label: "New Item" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "var(--bg-nav)",
      borderBottom: "1px solid var(--border)",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "56px",
      gap: "1.5rem",
    }}>
      <Link href="/" style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        fontWeight: 700,
        fontSize: "0.95rem",
        color: "var(--text-primary)",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}>
        <span style={{
          width: 8, height: 8,
          background: "var(--accent)",
          borderRadius: "50%",
          display: "inline-block",
          flexShrink: 0,
        }} />
        Items App
      </Link>

      <ul style={{
        display: "flex",
        gap: "0.25rem",
        listStyle: "none",
        flex: 1,
        justifyContent: "center",
      }}>
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link href={href} style={{
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: "0.875rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "6px",
                background: active ? "var(--bg-card)" : "transparent",
                fontWeight: active ? 500 : 400,
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.15s, color 0.15s",
              }}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
