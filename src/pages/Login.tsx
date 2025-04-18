import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { useContext, useRef } from "react";
import { mainContext } from "../context/MainProvider";
import { IUser } from "../interfaces/IUser";

interface ILoginProps {
  setUser: (user: IUser | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const { setUser, setIsLoggedIn } = useContext(mainContext) as ILoginProps;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // email and password are being validated with supabase
      const form = e.currentTarget as HTMLFormElement;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.value,
        password: form.password.value,
      });
      if (error) {
        console.error("Login error:", error.message);
        return;
      }

      if (data.user) {
        const userData: IUser = {
          id: data.user.id,
          email: data.user.email || "",
          firstName: data.user.user_metadata.first_name || "",
          lastName: data.user.user_metadata.last_name || "",
        };

        setUser(userData);
        setIsLoggedIn(true);

        // redirect to profile page
        navigate("/profile");
      }
      console.log("Login form submitted");
    } catch (error) {
      console.error("Error during login:", error);
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
      </form>
      <p className="text-sm italic">
        Don't have an account? Click{" "}
        <span
          onClick={() => navigate("/register")}
          className="cursor-pointer font-bold text-amber-400 not-italic"
        >
          here
        </span>
      </p>
    </div>
  );
};

export default Login;
