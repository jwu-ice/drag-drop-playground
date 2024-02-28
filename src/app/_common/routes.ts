export const NAV_ROUTES: LinkType[] = [
  { href: "/", name: "Home" },
  { href: "/todo", name: "Todo" },
  { href: "/kanban", name: "Kanban" },
] as const;

export const AUTH_ROUTES: LinkType[] = [
  { href: "/auth/signin", name: "signin" },
  { href: "/auth/signup", name: "signup" },
] as const;

export const FOOTER_GITHUB = "https://github.com/jwu-ice";
