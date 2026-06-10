const SESSION_KEY = "sumarh.session";
const ALLOWED_EMAIL = "sumarh@gmail.com";
const ALLOWED_PASSWORD = "sumarh123";
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123@";
const USERS_KEY = "sumarh.users";

export interface RegisteredUser {
  email: string;
  nombre?: string;
  dni?: string;
  createdAt: string;
}

function readUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as RegisteredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(list: RegisteredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("sumarh.users:changed"));
}

export function getRegisteredUsers(): RegisteredUser[] {
  return readUsers();
}

export function removeRegisteredUser(email: string) {
  writeUsers(readUsers().filter((u) => u.email !== email));
}

export interface StoredUser {
  nombre: string;
  email: string;
  dni: string;
  password: string;
}

export function registerUser(user: StoredUser): { ok: true } | { ok: false; error: string } {
  const list = readUsers();
  const email = user.email.trim().toLowerCase();
  if (!email) return { ok: false, error: "Email inválido." };
  if (list.some((u) => u.email === email)) {
    return { ok: false, error: "Ya existe una cuenta con ese email." };
  }
  list.push({ email, nombre: user.nombre, dni: user.dni, createdAt: new Date().toISOString() });
  writeUsers(list);
  return { ok: true };
}

export function loginUser(
  identifier: string,
  password: string,
): { ok: true; admin: boolean } | { ok: false; error: string } {
  const id = identifier.trim().toLowerCase();
  if (id === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: ADMIN_EMAIL, role: "admin" }));
    return { ok: true, admin: true };
  }
  if (id === ALLOWED_EMAIL && password === ALLOWED_PASSWORD) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: ALLOWED_EMAIL, role: "user" }));
    return { ok: true, admin: false };
  }
  return { ok: false, error: "Credenciales incorrectas. Intentá de nuevo." };
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(SESSION_KEY));
}

export function getCurrentSession(): { email: string; role: "admin" | "user" } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return { email: s.email, role: s.role === "admin" ? "admin" : "user" };
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  return getCurrentSession()?.role === "admin";
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}