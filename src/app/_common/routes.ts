export const NAV_ROUTES: LinkType[] = [
  { href: "/", name: "Home" },
  { href: "/todo", name: "DnD" },
  { href: "/kanban", name: "Kanban" },
  { href: "/sticker", name: "Sticker" },
] as const;

export const AUTH_ROUTES: LinkType[] = [
  { href: "/auth/login", name: "Login" },
  { href: "/auth/signup", name: "Sign up" },
] as const;

export const FOOTER_GITHUB = "https://github.com/jwu-ice";
