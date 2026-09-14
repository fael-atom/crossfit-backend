# 🏋️ CrossFit Box Manager — Backend

A REST API built for a real-world use case: running the day-to-day operations of a CrossFit box (gym). Members, retail products (supplements, gear, drinks sold at the front desk), and sales — all in one lightweight service.

This backend powers the admin/staff side of a CrossFit gym: register members, manage the small retail stock every box keeps at the counter, log sales, track who has paid, and automatically email members a receipt after every purchase.

## Why this project

Most CrossFit boxes run their front-desk sales on paper, spreadsheets, or WhatsApp. This API models that workflow directly:

- **Members** sign up once (name, email, phone, photo).
- **Products** — protein bars, shaker bottles, chalk, drinks — are stocked and priced.
- **Sales** are logged per member, itemized, and can be marked paid/unpaid — useful for boxes that let members run a monthly tab.
- A **confirmation email** is fired automatically after each sale, with an itemized receipt in Portuguese (pt-BR), formatted in Brazilian Real (R$).

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Web framework | Express 4 |
| ORM | Prisma 5 |
| Database | PostgreSQL |
| Validation | Zod |
| File uploads | Multer |
| Email | Nodemailer (Gmail SMTP) |
| API docs | Swagger UI |
| Containerization | Docker |

## Architecture

Lightweight layered (MVC-ish) structure — easy to read, easy to extend:

```
src/
├── server.js              # entry point, boots the HTTP server
├── app.js                 # Express app: middleware, routes, docs
├── routes/                # endpoint definitions per resource
├── controllers/           # HTTP request/response handling
├── services/               # business logic + Prisma queries
├── models/                # plain output-shaping classes
│   └── schemas/           # Zod validation schemas
├── middlewares/           # CORS, request validation
├── libs/                  # Prisma client singleton
└── utils/                 # helpers (e.g. currency formatting)
```

Request flow:

```
Client → Router → Validation (Zod) → Controller → Service (Prisma) → PostgreSQL
                                                        ↓
                                            Model formats the response
```

Sales trigger a side effect: on creation, `SalesService` looks up the buyer and, if they have an email on file, sends an HTML receipt via Nodemailer.

## Domain Model

- **User** — a gym member: name, email (unique), phone, active/admin flags, optional profile picture.
- **Product** — a retail item: name (unique), type/category, unit price, stock quantity, optional picture.
- **Sale** — a transaction: which member, a JSON snapshot of the purchased items, total, paid status, timestamp.

## API Overview

| Resource | Endpoints |
|---|---|
| `/users` | list (filter by name/email), get by id, create (with picture upload), update |
| `/products` | list, get by id, create (with picture upload), update, delete |
| `/sales` | list (filter by month/year, unpaid-by-user, yearly count), create, update, mark as paid, delete |
| `/docs` | interactive Swagger UI |

## Getting Started

```bash
npm install
npx prisma generate
npx prisma migrate dev

# copy .env.example to .env and fill in DATABASE_URL, PORT, and email credentials
npm run dev
```

The server redirects `/` to `/docs` for interactive API documentation.

## Roadmap / Next Steps

This project intentionally started as a functional MVP for a single box's front desk. Before exposing it beyond a trusted/internal environment, the following should be prioritized:

### Security (high priority)
- [ ] **Authentication & authorization** — every endpoint is currently open. Add auth (JWT or session-based) and require it on all write operations.
- [ ] **Fix mass-assignment risk on `/users`** — `admin` and `active` are currently accepted as user-editable fields; a caller can self-promote to admin. Strip privileged fields from the public update schema and gate role changes behind an admin-only endpoint.
- [ ] **Ownership checks on sales** — `PUT /sales/:id/mark-as-paid` and other sale mutations should verify the caller owns the sale or is staff/admin.
- [ ] **Restrict CORS** — a scoped `cors` middleware with an origin allowlist already exists (`middlewares/cors.js`) but isn't wired into `app.js`; enable it.
- [ ] **Validate file uploads** — restrict picture uploads to image mimetypes, cap file size, sanitize filenames before writing to disk.
- [ ] **Sanitize error responses** — avoid forwarding raw Prisma/Zod error messages to clients.

### Product / Engineering
- [ ] Move product uploads to object storage (S3-compatible) instead of local disk, for multi-instance/container deployments.
- [ ] Normalize `Sale.salesProductsInfo` into a relational `SaleItem` table to enable reporting queries (best-selling product, revenue by category, etc.).
- [ ] Add automated tests (unit + integration).
- [ ] Finish the production Docker stage (currently dev-only).

## License

See [LICENSE](./LICENSE).
