import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { useRef } from "react";

const Login = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // email and password are being validated with supabase
      const form = e.currentTarget as HTMLFormElement;

      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.value,
        password: form.password.value,
      });
      if (error) {
        console.error("Login error:", error.message);
        return;
      }
      // redirect to profile page
      navigate("/profile");

      console.log("Login form submitted");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async (form: HTMLFormElement) => {
    // send new user data to supabase
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email.value,
        password: form.password.value,
      });
      if (error) {
        console.error("Registration error:", error.message);
        return;
      }
      // redirect to profile page
      navigate("/profile");
      console.log("Register form submitted");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex grow flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-bold">Login</h1>
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="flex w-80 flex-col gap-4"
      >
        <input
          type="text"
          placeholder="email"
          className="rounded border border-gray-300 p-2"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded border border-gray-300 p-2"
          name="password"
          required
        />
        <button
          type="submit"
          className="cursor-pointer rounded bg-amber-300 p-2 font-bold hover:bg-amber-400"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            if (formRef.current) {
              handleRegister(formRef.current);
            }
          }}
          className="cursor-pointer rounded bg-slate-200 p-2 font-bold hover:bg-slate-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
