import { SignupForm } from "@/components/shared/auth/signupForm";

export const metadata = {
  title: "Register",
};

const SignUp = () => {
  return (
    <section className="w-full py-10">
      {/* Welcome Text */}
      <div className="text-center mb-3">
        <h2 className="text-3xl lg:text-4xl tracking-wide mb-2 font-semibold">
          Welcome to Shoppix !
        </h2>
        <p className="text-gray-600 text-lg">Create a new account</p>
      </div>

      {/* Form */}
      <SignupForm />
    </section>
  );
};

export default SignUp;
