import React, { useContext, useRef } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../context/MainProvider";
import { IUser } from "../interfaces/IUser";

interface IRegisterProps {
  setUser: (user: IUser | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Register = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(mainContext) as IRegisterProps;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;
    // send new user data to supabase
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            firstName: firstName,
            lastName: lastName,
          },
        },
      });
      if (error) {
        console.error("Registration error:", error.message);
        if (error.message.includes("already registered")) {
          alert(
            "Email already exists. Please sign in or use a different email.",
          );
        }
        return;
      }

      // set user data in context
      if (data && data.user) {
        const userData: IUser = {
          id: data.user.id,
          email: data.user.email || "",
          firstName: data.user.user_metadata.firstName || "",
          lastName: data.user.user_metadata.lastName || "",
        };
        setUser(userData);
        setIsLoggedIn(true);

        // redirect to profile page
        navigate("/profile");
        console.log("Register form submitted");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex grow flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-bold">Login</h1>
      <form
        ref={formRef}
        onSubmit={handleRegister}
        className="flex w-80 flex-col gap-4"
      >
        <input
          type="text"
          placeholder="First Name"
          className="rounded border border-gray-300 p-2"
          name="firstName"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="rounded border border-gray-300 p-2"
          name="lastName"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="rounded border border-gray-300 p-2"
          name="confirmPassword"
          required
        />

        <button
          type="submit"
          className="cursor-pointer rounded bg-amber-300 p-2 font-bold hover:bg-amber-400"
        >
          Register
        </button>
      </form>
      <p className="text-sm italic">
        Already have an account? Click{" "}
        <span
          onClick={() => navigate("/login")}
          className="cursor-pointer font-bold text-amber-400 not-italic"
        >
          here
        </span>
      </p>
    </div>
  );
};

export default Register;
