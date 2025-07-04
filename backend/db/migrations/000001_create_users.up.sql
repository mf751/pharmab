CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_admin BOOL DEFAULT FALSE,
  created_at TEXT DEFAULT (datetime('now')),
  phone_number TEXT NOT NULL
)
