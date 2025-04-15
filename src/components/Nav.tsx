import { NavLink, useNavigate } from "react-router-dom";
import { mainContext } from "../context/MainProvider";
import { useContext } from "react";

interface INavProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Nav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(mainContext) as INavProps;

  return (
    <div className="flex items-center justify-between border-t-12 border-t-amber-300 bg-white px-4 py-8">
      <h3
        className="cursor-pointer text-xl font-bold"
        onClick={() => navigate("/")}
      >
        RecipeWorld
      </h3>
      <div className="mx-4 flex items-center gap-10">
        <ul className="flex gap-4">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/recipes"}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Recipes
          </NavLink>
          <NavLink
            to={"/about-us"}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            About Us
          </NavLink>
        </ul>
        {!isLoggedIn && (
          <NavLink
            to={"/login"}
            className="cursor-pointer rounded-full bg-amber-300 px-4 py-2 font-bold hover:bg-amber-400"
          >
            Login
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            to={"/"}
            className="cursor-pointer rounded-full bg-amber-300 px-4 py-2 font-bold hover:bg-amber-400"
            onClick={() => setIsLoggedIn(false)}
          >
            Log Out
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
