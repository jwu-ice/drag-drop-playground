import { AUTH_ROUTES } from "@/app/_common/routes";
import RedirectText from "@/components/_common/RedirectText";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const [LOGIN, SIGNUP] = AUTH_ROUTES;
  return (
    <div className="card card-bordered w-96 shadow-xl">
      <div className="card-body space-y-3">
        <div className="card-title text-2xl">{LOGIN.name}</div>
        <LoginForm />
        <RedirectText
          url={`/auth/${LOGIN.href}`}
          redirectText="Don't have an account?"
          buttonText={SIGNUP.name}
        />
      </div>
    </div>
  );
};

export default LoginPage;
