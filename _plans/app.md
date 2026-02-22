# Plan: NextJS + FastAPI + SQLite App

## Context

Build a full-stack demo app inside `02-APP/` that mirrors the dark-mode aesthetic of `01-WEBSITE/index.html` (Claude docs style: `#0d0d0d` bg, orange `#e07b39` accent, card grids, sticky nav). Generic "Items" CRUD records. No auth. Useful as a course demo for AI-assisted full-stack development.

---

## Directory Layout

```
02-APP/
├── backend/
│   ├── main.py          # FastAPI app, CORS, routes
│   ├── database.py      # SQLite engine + session (SQLAlchemy)
│   ├── models.py        # SQLAlchemy ORM model
│   ├── schemas.py       # Pydantic request/response schemas
│   └── requirements.txt
└── frontend/
    ├── app/
    │   ├── layout.tsx        # Root layout (Nav + theme vars)
    │   ├── globals.css       # Design tokens (mirrored from 01-WEBSITE)
    │   ├── page.tsx          # Dashboard — stats cards
    │   └── items/
    │       ├── page.tsx          # Table view (paginated list)
    │       ├── new/page.tsx      # Create form
    │       └── [id]/
    │           ├── page.tsx      # Detail view
    │           └── edit/page.tsx # Edit form
    ├── components/
    │   ├── Nav.tsx
    │   ├── StatCard.tsx
    │   ├── DataTable.tsx
    │   └── ItemForm.tsx
    ├── lib/api.ts           # Typed fetch helpers (base URL from env)
    ├── next.config.ts       # rewrites /api/* → http://localhost:8000
    └── package.json
```

---

## Data Model — `Item`

| Field | Type | Notes |
|-------|------|-------|
| `id` | int PK | auto-increment |
| `title` | str | required, max 120 |
| `description` | str | optional |
| `status` | str | `"active"` \| `"archived"`, default `"active"` |
| `created_at` | datetime | server default = now |

---

## Backend (FastAPI)

**`database.py`** — SQLAlchemy sync engine, `data.db` in `backend/`, `get_db` dependency.

**`models.py`** — `Item` ORM class mapping to `items` table.

**`schemas.py`** — `ItemCreate`, `ItemUpdate`, `ItemOut` Pydantic models.

**`main.py`** routes:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/items` | List all (optional `?status=` filter, `?q=` search) |
| GET | `/items/{id}` | Single item |
| POST | `/items` | Create |
| PUT | `/items/{id}` | Full update |
| DELETE | `/items/{id}` | Delete (returns 204) |
| GET | `/stats` | `{ total, active, archived }` |

CORS: allow `http://localhost:3000`.

**`requirements.txt`**:
```
fastapi
uvicorn[standard]
sqlalchemy
pydantic
```

Run: `uvicorn main:app --reload --port 8000` (from `backend/`)

---

## Frontend (Next.js 14 App Router, TypeScript)

### Design tokens — `globals.css`

Copy the CSS custom properties directly from `01-WEBSITE/index.html`:
- `--bg: #0d0d0d`, `--bg-card: #1a1a1a`, `--border: #2a2a2a`
- `--accent: #e07b39`, `--text-primary: #f0f0f0`, `--text-secondary: #a0a0a0`
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif`
- Default theme: dark (`data-theme="dark"` on `<html>`)

### `next.config.ts` rewrites

```ts
rewrites: async () => [
  { source: '/api/:path*', destination: 'http://localhost:8000/:path*' }
]
```

All fetch calls use `/api/items` — no CORS issue, no hardcoded port in frontend.

### Pages

| Route | Component | Data |
|-------|-----------|------|
| `/` | Dashboard | `GET /stats` → 3 stat cards (Total, Active, Archived) |
| `/items` | DataTable | `GET /items` → paginated table with status badge + actions |
| `/items/new` | ItemForm | `POST /items` on submit → redirect to `/items` |
| `/items/[id]` | Detail | `GET /items/{id}` → card layout showing all fields |
| `/items/[id]/edit` | ItemForm | `GET` to prefill + `PUT /items/{id}` on submit |

### Key components

**`Nav.tsx`** — sticky, 56px, border-bottom `var(--border)`, orange dot brand mark, links to Dashboard / Items / New Item.

**`StatCard.tsx`** — `var(--bg-card)` background, 1px `var(--border)` border, large number + label, accent colour on the count.

**`DataTable.tsx`** — full-width table, row hover uses `var(--bg-card-hover)`, status badge (active = accent-soft bg, archived = muted).

**`ItemForm.tsx`** — inputs styled with `var(--bg-card)` bg, `var(--border)` border, accent focus ring; shared between create and edit.

---

## Running Locally

```bash
# Backend
cd 02-APP/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (separate terminal)
cd 02-APP/frontend
npm install
npm run dev        # http://localhost:3000
```

---

## Verification

1. `GET http://localhost:8000/items` returns `[]` (empty DB on first run)
2. Open `http://localhost:3000` — dashboard shows 0/0/0 stat cards
3. Navigate to `/items/new`, create a record → redirected to `/items` table
4. Click a row → detail view shows all fields
5. Click Edit → form pre-filled, save → updated in table
6. `GET http://localhost:8000/stats` returns `{ total: 1, active: 1, archived: 0 }`
