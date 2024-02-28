import RedirectText from "@/components/_common/RedirectText";
import SigninForm from "@/components/auth/SigninForm";

const SigninPage = () => {
  return (
    <div className="card card-bordered w-96 shadow-xl">
      <div className="card-body space-y-3">
        <div className="card-title text-2xl">Sign in</div>
        <SigninForm />
        <RedirectText
          url="/auth/signup"
          redirectText="Don't have an account?"
          buttonText="Sign up"
        />
      </div>
    </div>
  );
};

export default SigninPage;
