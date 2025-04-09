import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

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
        <NavLink
          to={"/login"}
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
