import Link from "next/link";
import WidthContainer from "@/components/_common/WidthContainer";
import ALink from "@/components/_common/ALink";
import { AUTH_ROUTES, NAV_ROUTES } from "@/app/_common/routes";
import ThemeController from "@/components/_common/ThemeController";

const Header = () => {
  return (
    <header>
      <nav className="navbar fixed left-0 top-0 z-50 w-full bg-base-100/90 p-0  backdrop-blur">
        <WidthContainer>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <Logo />
              <div className="space-x-3">
                {NAV_ROUTES?.slice(1).map(({ href, name }) => {
                  return <ALink href={href} name={name} key={name} />;
                })}
              </div>
            </div>
            <div className="flex">
              <ThemeController />
              <AuthNav />
            </div>
          </div>
        </WidthContainer>
      </nav>
    </header>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="mr-12 flex text-2xl font-bold  italic hover:opacity-80 max-sm:mr-3 max-sm:flex-col"
    >
      <span className="leading-5">Play</span>
      <span className="leading-5">ground</span>
    </Link>
  );
};

const AuthNav = () => {
  const [LOGIN, SIGNUP] = AUTH_ROUTES;

  return (
    <div className="space-x-1">
      <Link href={LOGIN.href} className="btn btn-ghost btn-sm rounded-xl max-sm:btn-xs  ">
        {LOGIN.name}
      </Link>
      <Link
        href={SIGNUP.href}
        className="btn btn-ghost btn-sm rounded-xl max-sm:btn-xs max-sm:hidden "
      >
        {SIGNUP.name}
      </Link>
    </div>
  );
};

export default Header;
